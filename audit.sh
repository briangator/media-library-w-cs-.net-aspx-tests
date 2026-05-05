#!/bin/bash
echo "--- Build and Test Audit ---" > build_test_logs.txt
echo "Date: $(date)" >> build_test_logs.txt

echo "Step 1: Linting..." >> build_test_logs.txt
npm run lint >> build_test_logs.txt 2>&1

echo "Step 2: Building..." >> build_test_logs.txt
npm run build >> build_test_logs.txt 2>&1

echo "Step 3: Running Playwright Tests..." >> build_test_logs.txt
npx playwright test >> build_test_logs.txt 2>&1

echo "Audit Complete. Check build_test_logs.txt for details."
