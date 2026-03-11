# GitHub Actions Local Testing Script for Windows
# Requires: Docker Desktop and act installed

param(
    [string]$Workflow = ".github/workflows/test.yml",
    [switch]$DryRun,
    [switch]$Verbose
)

Write-Host "`n🚀 GitHub Actions Local Testing Tool" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check prerequisites
function Test-Prerequisites {
    $errors = @()

    # Check Docker
    $dockerProcess = Get-Process "Docker Desktop" -ErrorAction SilentlyContinue
    if (!$dockerProcess) {
        $dockerCli = docker version 2>$null
        if ($LASTEXITCODE -ne 0) {
            $errors += "Docker Desktop is not running. Please start it first."
        }
    }

    # Check act
    $actInstalled = Get-Command act -ErrorAction SilentlyContinue
    if (!$actInstalled) {
        $errors += "act is not installed. Install with: scoop install act"
    }

    # Check if workflow exists
    if (!(Test-Path $Workflow)) {
        $errors += "Workflow file not found: $Workflow"
    }

    if ($errors.Count -gt 0) {
        Write-Host "`n❌ Prerequisites check failed:" -ForegroundColor Red
        $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
        return $false
    }

    Write-Host "✅ All prerequisites met" -ForegroundColor Green
    return $true
}

# Show menu
function Show-Menu {
    Write-Host "`n📋 Select what to test:" -ForegroundColor Yellow
    Write-Host "1. Quick Checks (Lint & Type Check)"
    Write-Host "2. Unit Tests Only"
    Write-Host "3. Integration Tests (with PostgreSQL)"
    Write-Host "4. Full CI Pipeline"
    Write-Host "5. List Available Jobs"
    Write-Host "6. Custom Job"
    Write-Host "0. Exit"
    Write-Host ""
}

# Run act with parameters
function Run-Act {
    param(
        [string]$Job = "",
        [string]$Event = "",
        [string]$ExtraArgs = ""
    )

    $cmd = "act"
    if ($Job) { $cmd += " -j $Job" }
    if ($Event) { $cmd += " $Event" }
    if ($Workflow) { $cmd += " -W $Workflow" }
    if ($DryRun) { $cmd += " -n" }
    if ($Verbose) { $cmd += " -v" }
    if ($ExtraArgs) { $cmd += " $ExtraArgs" }

    Write-Host "`n🔧 Running: $cmd" -ForegroundColor Magenta
    Invoke-Expression $cmd
}

# Main execution
if (!(Test-Prerequisites)) {
    exit 1
}

# Display workflow being used
Write-Host "Using workflow: $Workflow" -ForegroundColor Green

# Main loop
do {
    Show-Menu
    $choice = Read-Host "Select option"

    switch ($choice) {
        "1" {
            Write-Host "`n🔍 Running Lint & Type Checks..." -ForegroundColor Cyan
            Run-Act -Job "lint-and-typecheck"
        }
        "2" {
            Write-Host "`n🧪 Running Unit Tests..." -ForegroundColor Cyan
            Run-Act -Job "unit-tests"
        }
        "3" {
            Write-Host "`n🗄️ Starting PostgreSQL and running Integration Tests..." -ForegroundColor Cyan

            # Start PostgreSQL if docker-compose exists
            if (Test-Path "docker-compose.yml") {
                Write-Host "Starting PostgreSQL container..." -ForegroundColor Gray
                docker compose up -d postgres-test
                Start-Sleep -Seconds 3
            }

            Run-Act -Job "integration-tests" -ExtraArgs "--container-network-mode host"
        }
        "4" {
            Write-Host "`n🏃 Running Full CI Pipeline..." -ForegroundColor Cyan
            Run-Act
        }
        "5" {
            Write-Host "`n📝 Available Jobs:" -ForegroundColor Cyan
            act -l -W $Workflow
        }
        "6" {
            $jobName = Read-Host "Enter job name"
            if ($jobName) {
                Run-Act -Job $jobName
            }
        }
        "0" {
            Write-Host "`n👋 Goodbye!" -ForegroundColor Green
            break
        }
        default {
            Write-Host "Invalid option. Please try again." -ForegroundColor Red
        }
    }

    if ($choice -ne "0") {
        Write-Host "`n" -NoNewline
        pause
    }
} while ($choice -ne "0")

# Cleanup
Write-Host "`nCleaning up..." -ForegroundColor Gray
$stopDocker = Read-Host "Stop PostgreSQL container? (y/N)"
if ($stopDocker -eq 'y') {
    docker compose down
    Write-Host "PostgreSQL stopped" -ForegroundColor Green
}