#pragma once

#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTTextInputUtils.h>
#import <react/renderer/components/PasteTextInputSpecs/Props.h>
#import <react/renderer/components/iostextinput/primitives.h>

using namespace facebook::react;

// Convert component-specific enums to React Native standard enums
AutocapitalizationType convertAutoCapitalize(PasteTextInputAutoCapitalize value);
KeyboardType convertKeyboardType(PasteTextInputKeyboardType value);
ReturnKeyType convertReturnKeyType(PasteTextInputReturnKeyType value);
SubmitBehavior convertSubmitBehavior(PasteTextInputSubmitBehavior value);

#endif

