#ifdef RCT_NEW_ARCH_ENABLED
#import "PasteTextInputConversions.h"

AutocapitalizationType convertAutoCapitalize(PasteTextInputAutoCapitalize value) {
  switch (value) {
    case PasteTextInputAutoCapitalize::None:
      return AutocapitalizationType::None;
    case PasteTextInputAutoCapitalize::Words:
      return AutocapitalizationType::Words;
    case PasteTextInputAutoCapitalize::Sentences:
      return AutocapitalizationType::Sentences;
    case PasteTextInputAutoCapitalize::Characters:
      return AutocapitalizationType::Characters;
  }
}

KeyboardType convertKeyboardType(PasteTextInputKeyboardType value) {
  switch (value) {
    case PasteTextInputKeyboardType::Default:
      return KeyboardType::Default;
    case PasteTextInputKeyboardType::EmailAddress:
      return KeyboardType::EmailAddress;
    case PasteTextInputKeyboardType::Numeric:
      return KeyboardType::Numeric;
    case PasteTextInputKeyboardType::PhonePad:
      return KeyboardType::PhonePad;
    case PasteTextInputKeyboardType::NumberPad:
      return KeyboardType::NumberPad;
    case PasteTextInputKeyboardType::DecimalPad:
      return KeyboardType::DecimalPad;
    case PasteTextInputKeyboardType::Url:
      return KeyboardType::URL;
    case PasteTextInputKeyboardType::AsciiCapable:
      return KeyboardType::ASCIICapable;
    case PasteTextInputKeyboardType::NumbersAndPunctuation:
      return KeyboardType::NumbersAndPunctuation;
    case PasteTextInputKeyboardType::NamePhonePad:
      return KeyboardType::NamePhonePad;
    case PasteTextInputKeyboardType::Twitter:
      return KeyboardType::Twitter;
    case PasteTextInputKeyboardType::WebSearch:
      return KeyboardType::WebSearch;
    case PasteTextInputKeyboardType::VisiblePassword:
      return KeyboardType::VisiblePassword;
  }
}

ReturnKeyType convertReturnKeyType(PasteTextInputReturnKeyType value) {
  switch (value) {
    case PasteTextInputReturnKeyType::Done:
      return ReturnKeyType::Done;
    case PasteTextInputReturnKeyType::Go:
      return ReturnKeyType::Go;
    case PasteTextInputReturnKeyType::Next:
      return ReturnKeyType::Next;
    case PasteTextInputReturnKeyType::Search:
      return ReturnKeyType::Search;
    case PasteTextInputReturnKeyType::Send:
      return ReturnKeyType::Send;
    case PasteTextInputReturnKeyType::None:
      return ReturnKeyType::None;
    case PasteTextInputReturnKeyType::Previous:
      return ReturnKeyType::Previous;
    case PasteTextInputReturnKeyType::Default:
      return ReturnKeyType::Default;
    case PasteTextInputReturnKeyType::EmergencyCall:
      return ReturnKeyType::EmergencyCall;
    case PasteTextInputReturnKeyType::Google:
      return ReturnKeyType::Google;
    case PasteTextInputReturnKeyType::Join:
      return ReturnKeyType::Join;
    case PasteTextInputReturnKeyType::Route:
      return ReturnKeyType::Route;
    case PasteTextInputReturnKeyType::Yahoo:
      return ReturnKeyType::Yahoo;
  }
}

SubmitBehavior convertSubmitBehavior(PasteTextInputSubmitBehavior value) {
  switch (value) {
    case PasteTextInputSubmitBehavior::Submit:
      return SubmitBehavior::Submit;
    case PasteTextInputSubmitBehavior::BlurAndSubmit:
      return SubmitBehavior::BlurAndSubmit;
    case PasteTextInputSubmitBehavior::Newline:
      return SubmitBehavior::Newline;
  }
}

#endif

