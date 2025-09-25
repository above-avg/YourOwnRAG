#!/usr/bin/env python3
"""
Simple script to help you set up your Google API key for the RAG system.
"""

import os
import sys

def setup_api_key():
    print("🔑 Google API Key Setup for RAG System")
    print("=" * 50)
    
    # Check if API key is already set
    current_key = os.getenv("GOOGLE_API_KEY")
    if current_key and current_key != "dummy_key_for_testing":
        print(f"✅ API key is already set: {current_key[:10]}...")
        return
    
    print("To get your Google API key:")
    print("1. Go to: https://makersuite.google.com/app/apikey")
    print("2. Sign in with your Google account")
    print("3. Click 'Create API Key'")
    print("4. Copy the generated key")
    print()
    
    api_key = input("Enter your Google API key (or press Enter to skip): ").strip()
    
    if not api_key:
        print("⚠️  Skipping API key setup. The system will run in test mode.")
        print("   You can set it later using environment variables.")
        return
    
    # Set the environment variable for this session
    os.environ["GOOGLE_API_KEY"] = api_key
    print(f"✅ API key set for this session: {api_key[:10]}...")
    
    print("\n📝 To make this permanent, you can:")
    print("   Windows CMD: set GOOGLE_API_KEY=" + api_key)
    print("   Windows PowerShell: $env:GOOGLE_API_KEY=\"" + api_key + "\"")
    print("   Or add it to your system environment variables")

if __name__ == "__main__":
    setup_api_key()
