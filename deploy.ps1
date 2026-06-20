cd "c:\Users\PC\Desktop\Innovate Web"
git checkout source
cd community-website
npm run build
Copy-Item -Path "out" -Destination "..\temp_out" -Recurse -Force
cd ..
git checkout main
Get-ChildItem -Path . -Exclude ".git", "temp_out", "deploy.ps1" | Remove-Item -Recurse -Force
Copy-Item -Path "temp_out\out\*" -Destination "." -Recurse -Force
Remove-Item -Path "temp_out" -Recurse -Force
New-Item -Path ".nojekyll" -ItemType File -Force
Set-Content -Path "CNAME" -Value "innovateweb.org"
git add .
git commit -m "Deploy site"
git push origin main --force
