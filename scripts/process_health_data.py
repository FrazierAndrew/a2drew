#!/usr/bin/env python3
"""
Apple Health Data Processor
Converts large Apple Health XML export into manageable JSON files for web dashboard
"""

import xml.etree.ElementTree as ET
import json
import sys
from datetime import datetime, timedelta
from collections import defaultdict
import gzip

def parse_date(date_str):
    """Parse Apple Health date string to datetime object"""
    try:
        # Handle different date formats
        for fmt in ['%Y-%m-%d %H:%M:%S %z', '%Y-%m-%d %H:%M:%S']:
            try:
                return datetime.strptime(date_str.split('.')[0], fmt)
            except ValueError:
                continue
        return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    except:
        return None

def process_health_records(xml_file):
    """Process health records and extract key metrics"""
    
    print("Starting to process health data...")
    
    # Data containers
    daily_stats = defaultdict(lambda: {
        'steps': 0,
        'distance': 0,
        'calories_active': 0,
        'calories_basal': 0,
        'heart_rate_samples': [],
        'workouts': []
    })
    
    workout_summary = []
    heart_rate_stats = []
    
    # Track processing progress
    record_count = 0
    
    try:
        # Parse XML iteratively to handle large files
        context = ET.iterparse(xml_file, events=('start', 'end'))
        context = iter(context)
        event, root = next(context)
        
        for event, elem in context:
            if event == 'end':
                record_count += 1
                if record_count % 10000 == 0:
                    print(f"Processed {record_count:,} records...")
                
                # Process health records
                if elem.tag == 'Record':
                    process_record(elem, daily_stats, heart_rate_stats)
                
                # Process workouts
                elif elem.tag == 'Workout':
                    process_workout(elem, workout_summary, daily_stats)
                
                # Clear element to save memory
                elem.clear()
                root.clear()
    
    except ET.ParseError as e:
        print(f"XML Parse Error: {e}")
        return None
    except Exception as e:
        print(f"Error processing file: {e}")
        return None
    
    print(f"Finished processing {record_count:,} total records")
    
    # Convert daily stats to list and sort by date
    daily_data = []
    for date_str, stats in daily_stats.items():
        # Calculate average heart rate for the day
        if stats['heart_rate_samples']:
            stats['avg_heart_rate'] = sum(stats['heart_rate_samples']) / len(stats['heart_rate_samples'])
            stats['max_heart_rate'] = max(stats['heart_rate_samples'])
            stats['min_heart_rate'] = min(stats['heart_rate_samples'])
        
        # Remove raw samples to save space
        del stats['heart_rate_samples']
        
        daily_data.append({
            'date': date_str,
            **stats
        })
    
    daily_data.sort(key=lambda x: x['date'])
    
    return {
        'daily_summary': daily_data,
        'workout_summary': workout_summary,
        'heart_rate_stats': heart_rate_stats[-1000:],  # Keep last 1000 samples
        'summary_stats': calculate_summary_stats(daily_data, workout_summary)
    }

def process_record(elem, daily_stats, heart_rate_stats):
    """Process individual health record"""
    record_type = elem.get('type')
    value = elem.get('value')
    start_date = elem.get('startDate')
    
    if not all([record_type, value, start_date]):
        return
    
    try:
        value = float(value)
        date_obj = parse_date(start_date)
        if not date_obj:
            return
        
        date_key = date_obj.date().isoformat()
        
        # Process different record types
        if 'StepCount' in record_type:
            daily_stats[date_key]['steps'] += value
        
        elif 'DistanceWalkingRunning' in record_type:
            # Convert meters to miles
            daily_stats[date_key]['distance'] += value * 0.000621371
        
        elif 'ActiveEnergyBurned' in record_type:
            daily_stats[date_key]['calories_active'] += value
        
        elif 'BasalEnergyBurned' in record_type:
            daily_stats[date_key]['calories_basal'] += value
        
        elif 'HeartRate' in record_type:
            daily_stats[date_key]['heart_rate_samples'].append(value)
            heart_rate_stats.append({
                'value': value,
                'timestamp': start_date
            })
    
    except (ValueError, TypeError):
        pass

def process_workout(elem, workout_summary, daily_stats):
    """Process workout data"""
    try:
        workout_type = elem.get('workoutActivityType')
        duration = float(elem.get('duration', 0))
        total_distance = float(elem.get('totalDistance', 0))
        total_energy = float(elem.get('totalEnergyBurned', 0))
        start_date = elem.get('startDate')
        
        date_obj = parse_date(start_date)
        if not date_obj:
            return
        
        date_key = date_obj.date().isoformat()
        
        workout_data = {
            'type': workout_type,
            'duration_minutes': duration / 60,
            'distance_miles': total_distance * 0.000621371 if total_distance else 0,
            'calories': total_energy,
            'date': start_date,
            'day': date_key
        }
        
        workout_summary.append(workout_data)
        daily_stats[date_key]['workouts'].append(workout_data)
    
    except (ValueError, TypeError):
        pass

def calculate_summary_stats(daily_data, workout_summary):
    """Calculate overall summary statistics"""
    if not daily_data:
        return {}
    
    recent_30_days = daily_data[-30:] if len(daily_data) >= 30 else daily_data
    recent_7_days = daily_data[-7:] if len(daily_data) >= 7 else daily_data
    
    # Calculate averages
    stats = {
        'total_days': len(daily_data),
        'avg_daily_steps_30d': sum(d['steps'] for d in recent_30_days) / len(recent_30_days),
        'avg_daily_steps_7d': sum(d['steps'] for d in recent_7_days) / len(recent_7_days),
        'total_workouts': len(workout_summary),
        'recent_workouts_30d': len([w for w in workout_summary if w['day'] in [d['date'] for d in recent_30_days]]),
        'total_distance_miles': sum(d['distance'] for d in daily_data),
        'avg_daily_distance_30d': sum(d['distance'] for d in recent_30_days) / len(recent_30_days),
    }
    
    # Workout type breakdown
    workout_types = defaultdict(int)
    for workout in workout_summary:
        workout_types[workout['type']] += 1
    
    stats['workout_type_breakdown'] = dict(workout_types)
    
    return stats

def main():
    if len(sys.argv) != 2:
        print("Usage: python process_health_data.py <path_to_export.xml>")
        sys.exit(1)
    
    xml_file_path = sys.argv[1]
    
    print(f"Processing Apple Health data from: {xml_file_path}")
    
    # Process the data
    processed_data = process_health_records(xml_file_path)
    
    if not processed_data:
        print("Failed to process health data")
        sys.exit(1)
    
    # Save processed data as compressed JSON
    output_file = 'public/health_data_processed.json'
    
    try:
        with open(output_file, 'w') as f:
            json.dump(processed_data, f, indent=2, default=str)
        
        print(f"\nProcessing complete!")
        print(f"Processed data saved to: {output_file}")
        print(f"Total days of data: {processed_data['summary_stats']['total_days']}")
        print(f"Total workouts: {processed_data['summary_stats']['total_workouts']}")
        print(f"File size: {len(json.dumps(processed_data)) / 1024 / 1024:.2f} MB")
        
    except Exception as e:
        print(f"Error saving processed data: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
