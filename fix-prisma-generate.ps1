# Fix Prisma Generate - Stop Node processes and regenerate Prisma client
Write-Host "`n=== FIXING PRISMA GENERATE ===" -ForegroundColor Yellow
Write-Host "`nStopping all Node.js processes..." -ForegroundColor Cyan

# Get all Node processes
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node.js process(es)" -ForegroundColor Yellow
    foreach ($proc in $nodeProcesses) {
        Write-Host "  - Stopping process ID: $($proc.Id) ($($proc.ProcessName))" -ForegroundColor Gray
        try {
            Stop-Process -Id $proc.Id -Force -ErrorAction Stop
            Write-Host "    ✓ Stopped" -ForegroundColor Green
        } catch {
            Write-Host "    ✗ Failed to stop: $_" -ForegroundColor Red
        }
    }
    
    # Wait a moment for processes to fully terminate
    Write-Host "`nWaiting 2 seconds for processes to fully terminate..." -ForegroundColor Cyan
    Start-Sleep -Seconds 2
} else {
    Write-Host "No Node.js processes found running" -ForegroundColor Green
}

# Check if Prisma query engine file exists and is locked
$queryEnginePath = "node_modules\.prisma\client\query_engine-windows.dll.node"
if (Test-Path $queryEnginePath) {
    Write-Host "`nRemoving old Prisma query engine file..." -ForegroundColor Cyan
    try {
        Remove-Item $queryEnginePath -Force -ErrorAction Stop
        Write-Host "  ✓ Removed" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Could not remove (may still be locked): $_" -ForegroundColor Yellow
        Write-Host "  Trying to remove .tmp files..." -ForegroundColor Cyan
        Get-ChildItem "node_modules\.prisma\client\*.tmp*" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    }
}

# Generate Prisma client
Write-Host "`nGenerating Prisma client..." -ForegroundColor Cyan
try {
    npx prisma generate
    Write-Host "`n✓ Prisma client generated successfully!" -ForegroundColor Green
    Write-Host "`nYou can now restart your dev server with: npm run dev" -ForegroundColor Cyan
} catch {
    Write-Host "`n✗ Error generating Prisma client: $_" -ForegroundColor Red
    Write-Host "`nTry manually:" -ForegroundColor Yellow
    Write-Host "  1. Make sure all Node processes are stopped" -ForegroundColor Gray
    Write-Host "  2. Run: npx prisma generate" -ForegroundColor Gray
    exit 1
}
