document.getElementById('option-removeapps').addEventListener('change', () => {
    const checked = document.getElementById('option-removeapps').checked;

    let div = document.querySelector('div.removeapps-options');
    if (checked) {
        div.style.display = "grid";
    } else {
        div.style.display = "none";
    }
});

let apps = [
  "Cortana",
  "Weather",
  "Tips",
  "3D Viewer",
  "Office Hub",
  "Solitaire Collection",
  "Sticky Notes",
  "Mixed Reality Portal",
  "OneNote",
  "People",
  "Snip & Sketch",
  "Skype",
  "Wallet",
  "Photos",
  "Alarms & Clock",
  "Camera",
  "Feedback Hub",
  "Maps",
  "Voice Recorder",
  "Xbox Title UI",
  "Xbox App (legacy)",
  "Xbox Game Overlay",
  "Xbox Game Bar",
  "Xbox Identity Provider",
  "Xbox Speech to Text Overlay",
  "Phone Link"
];

let appids = [
  "Microsoft.549981C3F5F10",
  "Microsoft.BingWeather",
  "Microsoft.Getstarted",
  "Microsoft.Microsoft3DViewer",
  "Microsoft.MicrosoftOfficeHub",
  "Microsoft.MicrosoftSolitaireCollection",
  "Microsoft.MicrosoftStickyNotes",
  "Microsoft.MixedReality.Portal",
  "Microsoft.Office.OneNote",
  "Microsoft.People",
  "Microsoft.ScreenSketch",
  "Microsoft.SkypeApp",
  "Microsoft.Wallet",
  "Microsoft.Windows.Photos",
  "Microsoft.WindowsAlarms",
  "Microsoft.WindowsCamera",
  "Microsoft.WindowsFeedbackHub",
  "Microsoft.WindowsMaps",
  "Microsoft.WindowsSoundRecorder",
  "Microsoft.Xbox.TCUI",
  "Microsoft.XboxApp",
  "Microsoft.XboxGameOverlay",
  "Microsoft.XboxGamingOverlay",
  "Microsoft.XboxIdentityProvider",
  "Microsoft.XboxSpeechToTextOverlay",
  "Microsoft.YourPhone"
];


for (let i = 0; i < apps.length; i++) {
    let container = document.createElement("div");
    container.className = "removeapps-option";

    let check = document.createElement("input");
    check.type = "checkbox";
    check.className = "removeapps-option-checkbox";
    check.id = appids[i].replaceAll(".", "_");

    let label = document.createElement("label");
    label.htmlFor = appids[i].replaceAll(".", "_");
    label.innerText = apps[i];

    container.append(check, label);
    document.querySelector('div.removeapps-options').append(container);
}

function generate() {
    let commands = [];

    for (let i = 0; i < appids.length; i++) {
        let checkbox = document.querySelector(`input[type="checkbox"]#${appids[i].replaceAll(".", "_")}`);
        if (checkbox.checked) {
            commands.push(`Get-AppxPackage ${appids[i]} | Remove-AppxPackage`);
        }
    }

    if (document.querySelector('input[type="checkbox"]#option-removeletsfinish').checked)
        commands.push('New-Item -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\UserProfileEngagement" -Force',
            'New-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\UserProfileEngagement" -Name "ScoobeSystemSettingEnabled" -Value 0 -PropertyType DWord -Force');

    if (document.querySelector('input[type="checkbox"]#option-disabletelemetry').checked)
        commands.push('Stop-Service -Name "DiagTrack" -Force',
            'Set-Service -Name "DiagTrack" -StartupType Disabled',
            'Stop-Service -Name "dmwappushservice" -Force',
            'Set-Service -Name "dmwappushservice" -StartupType Disabled',
            'Disable-ScheduledTask -TaskName "Proxy" -TaskPath "\\Microsoft\\Windows\\Autochk\\"',
            'Disable-ScheduledTask -TaskName "Microsoft-Windows-DiskDiagnosticDataCollector" -TaskPath "\\Microsoft\\Windows\\DiskDiagnostic\\"',
            'Disable-ScheduledTask -TaskName "Microsoft Compatibility Appraiser" -TaskPath "\\Microsoft\\Windows\\Application Experience\\"',
            'Disable-ScheduledTask -TaskName "ProgramDataUpgrader" -TaskPath "\\Microsoft\\Windows\\Application Experience\\"',
            'Disable-ScheduledTask -TaskName "Consolidator" -TaskPath "\\Microsoft\\Windows\\Customer Experience Improvement Program\\"',
            'Disable-ScheduledTask -TaskName "UsbCeip" -TaskPath "\\Microsoft\\Windows\\Customer Experience Improvement Program\\"');

    document.querySelector('textarea#script').value = commands.join("\n");
}