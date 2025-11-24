# Accessible React Components

A lightweight, production-quality React component library focused on **accessibility-first UI design**. Built with **React, TypeScript, Storybook, Vite, and modern ARIA patterns**. Includes fully accessible components like Modals, Comboboxes, DatePickers, and Toast notifications.

## ✨ Features

- ♿ **WCAG + ARIA compliant** components  
- ⌨️ Full **keyboard support**  
- 🧪 **Unit + integration tests** with Vite 
- 📚 **Storybook** documentation  
<!-- - 📦 Published as a consumable component library (optional)  -->
- 🧩 Modular architecture  
<!-- - 🔧 Zero external UI dependencies (only React + TS) -->

---

## 📦 Included Components

### **1. Modal**
- Focus trap  
- Escape key handling  
- aria-modal + role="dialog"  
<!-- - Portals for layering -->

<!-- ### **2. Combobox / Autocomplete**
- Fully keyboard navigable  
- Async filtering support  
- ARIA listbox semantics  

### **3. DatePicker**
- Calendar grid with arrow navigation  
- Screen reader–friendly month/year controls  
- Single or range selection  

### **4. Toast System**
- Stacking + auto-dismiss  
- Screen reader live region  
- Portals + motion-ready  

---

## 🏗 Architecture

```mermaid
flowchart TD
  A[Components] --> B[Modal]
  A --> C[Combobox]
  A --> D[DatePicker]
  A --> E[Toast]
  B --> F[Hooks & Utils]
  C --> F
  D --> F
  E --> F

  F --> G[Accessibility Utils]
  F --> H[Focus Management]
  F --> I[ARIA Helpers]

  A --> J[Storybook]
  A --> K[Unit Tests] -->
