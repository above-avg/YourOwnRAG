#!/usr/bin/env python3
"""
Simple environment variable loader for the RAG system.
Loads environment variables from the _env file.
"""

import os
from pathlib import Path

def load_env_file(env_file_path="_env"):
    """Load environment variables from _env file."""
    env_path = Path(env_file_path)
    
    if not env_path.exists():
        print(f"⚠️  _env file not found. Please create it with your API keys.")
        return False
    
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                
                # Skip empty lines and comments
                if not line or line.startswith('#'):
                    continue
                
                # Parse key=value pairs
                if '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip()
                    
                    # Remove quotes if present
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                    
                    # Set environment variable
                    if key and value and value != f"your_{key.lower()}_here":
                        os.environ[key] = value
                        print(f"✅ Loaded {key}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading _env file: {e}")
        return False

# Auto-load when imported
if __name__ == "__main__":
    load_env_file()
else:
    # Load environment variables when this module is imported
    load_env_file()
