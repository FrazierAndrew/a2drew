#!/bin/bash

# Apple Health Data Processing Script
# This script processes your large Apple Health XML export into manageable JSON

echo "🏥 Apple Health Data Processor"
echo "================================"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Find the health data file
HEALTH_FILE=""
if [ -f "health_data/apple_health_export/export.xml" ]; then
    HEALTH_FILE="health_data/apple_health_export/export.xml"
elif [ -f "health_data/export.xml" ]; then
    HEALTH_FILE="health_data/export.xml"
else
    echo "❌ Could not find Apple Health export.xml file"
    echo "   Please ensure it's located in one of:"
    echo "   - health_data/apple_health_export/export.xml"
    echo "   - health_data/export.xml"
    exit 1
fi

echo "📁 Found health data file: $HEALTH_FILE"

# Get file size
FILE_SIZE=$(du -h "$HEALTH_FILE" | cut -f1)
echo "📊 File size: $FILE_SIZE"

# Create public directory if it doesn't exist
mkdir -p public

echo "🔄 Processing health data... (this may take several minutes)"
echo "   Large files require patience - grab a coffee! ☕"

# Run the Python processor
python3 scripts/process_health_data.py "$HEALTH_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Health data processing complete!"
    echo "🎉 Your dashboard is ready to use!"
    echo ""
    echo "Next steps:"
    echo "1. Start your React app: npm start"
    echo "2. Visit your homepage to see your health dashboard"
    echo ""
else
    echo "❌ Processing failed. Check the error messages above."
    exit 1
fi
