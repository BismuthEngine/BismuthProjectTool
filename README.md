# Bismuth Project Tool
A simple project tool for Bismuth Engine and it's projects.

## Installation
```
    npm install -g git+https://github.com/BismuthEngine/BismuthProjectTool.git
```

## Building
```py
    # After downloading source code, inside of source root directory
    # Compile Typescript
    npm run build
    # Install globally and create symlink
    npm install -g ./
```

## Usage
```
bismuth-project-tool
    --vsproj <Path> - Generate Visual Studio 2022 project files
    --xcode <Path> - Generate XCode project files

    -v - More detailed log
```