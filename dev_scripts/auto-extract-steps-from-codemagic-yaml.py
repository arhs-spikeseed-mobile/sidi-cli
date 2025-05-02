"""
This script extracts script steps defined with anchors from a `codemagic.yaml` file
and exports each as a separate `step.yml` file in structured subfolders.

Usage:
1. Place this script in the **same directory** as your `codemagic.yaml`.
2. Ensure your `codemagic.yaml` contains script steps with anchors (e.g. `- &build_step`).
3. Run the script with Python: `python auto-extract-steps-from-codemagic-yaml.py`.
4. For each anchored step, a folder will be created at: `steps_to_export/<anchor_name>/codemagic/step.yml`.

Each `step.yml` will include:
- The name of the step
- A fixed `ignore_failure: true` field
- The script content from the original YAML

Requirements:
- Python 3
- PyYAML (`pip install pyyaml`)
"""

import os
import yaml
import re

INPUT_FILE = "codemagic.yaml"
EXPORT_BASE_DIR = "steps_to_export"

def extract_anchors(file_path):
    """Return a list of (anchor_name, index_in_scripts) tuples."""
    anchors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            match = re.match(r"\s*-\s*&(\S+)", line)
            if match:
                anchors.append((match.group(1), len(anchors)))
    return anchors

def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        yaml_data = yaml.safe_load(f)

    anchors = extract_anchors(INPUT_FILE)
    scripts = yaml_data.get("scripts", [])

    for anchor_name, index in anchors:
        try:
            step_data = scripts[index]
        except IndexError:
            print(f"⚠️ Warning: No step found at index {index} for anchor '{anchor_name}'")
            continue

        if not isinstance(step_data, dict):
            continue

        step_name = step_data.get("name")
        script_content = step_data.get("script")

        if not step_name or not script_content:
            continue

        output_dir = os.path.join(EXPORT_BASE_DIR, anchor_name, "codemagic")
        os.makedirs(output_dir, exist_ok=True)

        step_yaml_path = os.path.join(output_dir, "step.yml")
        with open(step_yaml_path, "w", encoding="utf-8") as f:
            f.write(f'name: "{step_name}"\n')
            f.write("ignore_failure: true\n")
            f.write("script: |\n")
            for line in script_content.splitlines():
                f.write(f"   {line.rstrip()}\n")  # 3 spaces here

        print(f"✅ Exported: {step_yaml_path}")

if __name__ == "__main__":
    main()
