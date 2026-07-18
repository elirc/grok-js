/*
BEGINNER GOAL:
Understand the structure of a modern .NET project.

REAL WORLD USE CASE:
Every .NET application follows a similar layout. Knowing this helps you navigate any codebase.

CONCEPTS COVERED:
- .csproj file
- Program.cs
- Folders: Models, Services, Controllers
- SDK vs Runtime
*/

// ============================================
// STEP 1: The project file
// ============================================

// MyApp.csproj
/*
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

</Project>
*/

// ============================================
// STEP 2: Entry point
// ============================================

// Program.cs (top-level statements)
Console.WriteLine("Hello from .NET!");

// ============================================
// STEP 3: Common folder structure
// ============================================

/*
MyApp/
├── Program.cs
├── Models/
├── Services/
├── Data/
└── MyApp.csproj
*/

/*
LINE-BY-LINE BREAKDOWN:

Sdk="Microsoft.NET.Sdk"
- Tells .NET what kind of project this is

TargetFramework
- Which version of .NET to build against

NOOB TRANSLATION:

The .csproj is the instruction manual for your project.
Program.cs is where the program starts running.

COMMON MISTAKES:

1. Editing .csproj by hand when the IDE can do it.
2. Putting everything in the root folder.

TRY CHANGING THIS:

1. Create a new console project with `dotnet new console`.
2. Explore the generated files.

MINI CHALLENGE:

Create a new .NET console project and add a simple "Models" folder with a Person class.
*/