# Kill all Next.js dev processes and restart
Write-Host "Stopping Next.js dev processes..." -ForegroundColor Yellow

# Find and kill node processes running Next.js (using taskkill for more reliable termination)
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    foreach ($process in $nodeProcesses) {
        try {
            $commandLine = (Get-CimInstance Win32_Process -Filter "ProcessId = $($process.Id)").CommandLine
            if ($commandLine -like "*next*dev*" -or $commandLine -like "*pnpm*dev*") {
                Write-Host "  Killing process $($process.Id)" -ForegroundColor Red
                # Use taskkill for more aggressive termination on Windows
                taskkill /F /PID $process.Id /T 2>$null
            }
        } catch {
            # Silently continue if we can't access the process
        }
    }
    Write-Host "Waiting for cleanup..." -ForegroundColor Yellow
    Start-Sleep -Seconds 1
} else {
    Write-Host "  No node processes found" -ForegroundColor Gray
}

# Start the dev server
Write-Host "`nStarting dev server with pnpm..." -ForegroundColor Green
pnpm run dev
