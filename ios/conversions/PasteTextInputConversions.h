/**
 * Helper functions for PasteTextInput component
 * React Native 0.81+ New Architecture
 * 
 * This file contains type conversion utilities needed to bridge between:
 * - Component-specific codegen types (PasteTextInputAutoCapitalize, etc.)
 * - React Native standard types (AutocapitalizationType, etc.)
 */

#pragma once

#ifdef RCT_NEW_ARCH_ENABLED

#import <UIKit/UIKit.h>
#import <react/renderer/components/PasteTextInputSpecs/Props.h>
#import <React/RCTTextInputUtils.h>

using namespace facebook::react;

/**
 * Convert PasteTextInput codegen enum to React Native standard enum
 */
AutocapitalizationType convertAutoCapitalize(PasteTextInputAutoCapitalize value);

/**
 * Convert PasteTextInput codegen enum to React Native standard enum
 */
KeyboardType convertKeyboardType(PasteTextInputKeyboardType value);

/**
 * Convert PasteTextInput codegen enum to React Native standard enum
 */
ReturnKeyType convertReturnKeyType(PasteTextInputReturnKeyType value);

/**
 * Convert string prop to UIKit keyboard appearance
 * Handles: "dark", "light", "default"
 */
UIKeyboardAppearance keyboardAppearanceFromString(const std::string &value);

/**
 * Convert string prop to UIKit text field view mode
 * Handles: "never", "while-editing", "unless-editing", "always"
 */
UITextFieldViewMode textFieldViewModeFromString(const std::string &value);

#endif

