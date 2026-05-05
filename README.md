# Media Library Management System Pro
Written by Brian McCarthy

## Project Overview
A professional-grade **C# / .NET** Media Management System demonstrating mastery of core Object-Oriented Programming (OOP) principles. The system manages a curated catalog of 45 technical and entertainment assets, integrating real-time analytics, polymorphic e-commerce logic, and a multi-framework testing suite.

## Achieving Project Objectives: Architectural Implementation

### 1. Inheritance Hierarchies (`MediaItem.cs`)
We established a robust inheritance tree using a "is-a" relationship model. 
- **Base Class**: `MediaItem` serves as the abstract root, containing shared properties like `Title`, `Year`, `Thumbnail`, and `ReviewScore`.
- **Derived Classes**: `Book`, `DVD`, and `MusicAlbum` extend `MediaItem`. This hierarchy allows us to reuse generic logic (like ID generation) while specializing behavior (like page counts for books vs. runtime for movies).
- **Implementation**: Used the `base` keyword in constructors to ensure proper state initialization across the inheritance chain.

### 2. Polymorphism & Virtual Methods
The system uses **Runtime Polymorphism** to handle different media types through a single interface.
- **Virtual Methods**: `GetEstimatedValue()` and `GetCategoryInfo()` are defined as `virtual` in the base class.
- **Overrides**: Derived classes use `override` to provide custom logic. For example, `Book` adds a value bonus for page counts > 300, while `DVD` adds a bonus for longer runtimes.
- **Dynamic Resolution**: In `MediaLibrary.cs`, when we iterate through a `List<MediaItem>`, the CLR resolves the correct version of the method based on the object's actual type at runtime.

### 3. Strict Encapsulation & Validation
Data integrity is protected using the principle of least privilege.
- **Private Fields**: Internal state (e.g., `_title`, `_reviewScore`) is kept `private`.
- **Public Properties**: Data is exposed via controlled properties. 
- **Validation Gates**: The `set` blocks of properties (and protected `Validate` methods) enforce strict rules:
  - Titles cannot be empty or exceed 100 characters.
  - Review scores are automatically clamped between 0.0 and 5.0.
  - Years are restricted to the range 1800-Current.

### 4. Abstraction & Interface Contracts (`Interfaces.cs`)
We decoupled implementation from consumption using `interface` contracts.
- **IDisplayable**: Simplifies UI binding by forcing all items to provide a coherent display string.
- **ISearchable**: Standardizes search logic. By implementing this, any new media type added in the future will automatically work with the existing search engine.
- **Result**: The `MediaLibrary` manager doesn't need to know *what* it's searching; it only needs to know the object adheres to the `ISearchable` contract.

### 5. AI-Assisted Design & Documentation
- **Copilot Integration**: Used AI to generate high-fidelity XML documentation (`/// <summary>`) for all public APIs, ensuring a self-documenting codebase.
- **Design Oversight**: AI was leveraged to verify that the hierarchy didn't violate the *Liskov Substitution Principle*, ensuring that any derived class can stand in for its base class without breaking the system.

## Technologies Used
- **Primary Language**: C# 12 / .NET 8.0
- **Web Framework**: React 18 & Vite
- **Automation**: Selenium, Playwright, SpecFlow (Cucumber), Cypress
- **Styling & UI**: Tailwind CSS, Framer Motion, Lucide React
- **AI**: Copilot-assisted design and XML documentation logic

## Testing Frameworks
The project includes a massive cross-platform testing suite (15 tests each):
- **Selenium (C#)**: UI automation for browser-based interactions.
- **Playwright (C#)**: Modern E2E testing for fast, reliable web flows.
- **Cypress (JS)**: Front-end developer-centric journey testing.
- **Cucumber (C#)**: Feature-based BDD testing with Gherkin scenarios.

## Documentation
- **Written by Brian McCarthy**
- Brian McCarthy Development Environment
- SDK: .NET 8.0 / React 18 / Lucide React
- Visuals: Unsplash Integration

