"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _PasteTextInputNativeComponent = _interopRequireWildcard(require("./PasteTextInputNativeComponent"));
var _reactNative = require("react-native");
var _TextAncestor = _interopRequireDefault(require("react-native/Libraries/Text/TextAncestor"));
var _TextInputState = _interopRequireDefault(require("react-native/Libraries/Components/TextInput/TextInputState"));
var _usePressability = _interopRequireDefault(require("react-native/Libraries/Pressability/usePressability"));
var _flattenStyle = _interopRequireDefault(require("react-native/Libraries/StyleSheet/flattenStyle"));
var _nullthrows = _interopRequireDefault(require("nullthrows"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const emptyFunctionThatReturnsTrue = () => true;
function useMergeRefs(...refs) {
  return React.useCallback(current => {
    for (const ref of refs) {
      if (ref != null) {
        if (typeof ref === 'function') {
          ref(current);
        } else {
          ref.current = current;
        }
      }
    }
  }, [...refs] // eslint-disable-line react-hooks/exhaustive-deps
  );
}
function InternalTextInput(props) {
  const {
    'aria-busy': ariaBusy,
    'aria-checked': ariaChecked,
    'aria-disabled': ariaDisabled,
    'aria-expanded': ariaExpanded,
    'aria-selected': ariaSelected,
    accessibilityState,
    id,
    tabIndex,
    'selection': propsSelection,
    selectionColor,
    // selectionHandleColor,
    // cursorColor,
    ...otherProps
  } = props;
  const inputRef = React.useRef(null);
  const selection = React.useMemo(() => propsSelection == null ? null : {
    start: propsSelection.start,
    end: propsSelection.end ?? propsSelection.start
  }, [propsSelection]);
  const [mostRecentEventCount, setMostRecentEventCount] = React.useState(0);
  const [lastNativeText, setLastNativeText] = React.useState(props.value);
  const [lastNativeSelectionState, setLastNativeSelection] = React.useState({
    selection: {
      start: -1,
      end: -1
    },
    mostRecentEventCount
  });
  const lastNativeSelection = lastNativeSelectionState.selection;
  const text = typeof props.value === 'string' ? props.value : typeof props.defaultValue === 'string' ? props.defaultValue : undefined;

  // This is necessary in case native updates the text and JS decides
  // that the update should be ignored and we should stick with the value
  // that we have in JS.
  React.useLayoutEffect(() => {
    const nativeUpdate = {};
    if (lastNativeText !== props.value && typeof props.value === 'string') {
      nativeUpdate.text = props.value;
      setLastNativeText(props.value);
    }
    if (selection && lastNativeSelection && (lastNativeSelection.start !== selection.start || lastNativeSelection.end !== selection.end)) {
      nativeUpdate.selection = selection;
      setLastNativeSelection({
        selection,
        mostRecentEventCount
      });
    }
    if (Object.keys(nativeUpdate).length === 0) {
      return;
    }
    if (inputRef.current != null) {
      _PasteTextInputNativeComponent.Commands.setTextAndSelection(inputRef.current, mostRecentEventCount, text, selection?.start ?? -1, selection?.end ?? -1);
    }
  }, [mostRecentEventCount, inputRef, props.value, props.defaultValue, lastNativeText, selection, lastNativeSelection, text]);
  let children = props.children;
  const childCount = React.Children.count(children);
  if (props.value != null && childCount) {
    throw new Error('Cannot specify both value and children');
  }
  if (childCount > 1) {
    children = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      children: children
    });
  }
  React.useLayoutEffect(() => {
    const inputRefValue = inputRef.current;
    if (inputRefValue != null) {
      _TextInputState.default.registerInput(inputRefValue);
    }
    return () => {
      if (inputRefValue != null) {
        _TextInputState.default.unregisterInput(inputRefValue);
      }
      if (_TextInputState.default.currentlyFocusedInput() === inputRefValue) {
        (0, _nullthrows.default)(inputRefValue).blur();
      }
    };
  }, [inputRef]);
  const setLocalRef = React.useCallback(instance => {
    inputRef.current = instance;
    if (instance != null) {
      // $FlowFixMe[incompatible-use] - See the explanation above.
      Object.assign(instance, {
        clear() {
          if (inputRef.current != null) {
            _PasteTextInputNativeComponent.Commands.setTextAndSelection(inputRef.current, mostRecentEventCount, '', 0, 0);
          }
        },
        // TODO: Fix this returning true on null === null, when no input is focused
        isFocused() {
          return _TextInputState.default.currentlyFocusedInput() === inputRef.current;
        },
        getNativeRef() {
          return inputRef.current;
        },
        setSelection(start, end) {
          if (inputRef.current != null) {
            _PasteTextInputNativeComponent.Commands.setTextAndSelection(inputRef.current, mostRecentEventCount, null, start, end);
          }
        }
      });
    }
  }, [mostRecentEventCount]);
  const ref = useMergeRefs(setLocalRef, props.forwardedRef);
  const _onChange = event => {
    const currentText = event.nativeEvent.text;
    props.onChange && props.onChange(event);
    props.onChangeText && props.onChangeText(currentText);
    if (inputRef.current == null) {
      // calling `props.onChange` or `props.onChangeText`
      // may clean up the input itself. Exits here.
      return;
    }
    setLastNativeText(currentText);
    // This must happen last, after we call setLastNativeText.
    // Different ordering can cause bugs when editing AndroidTextInputs
    // with multiple Fragments.
    // We must update this so that controlled input updates work.
    setMostRecentEventCount(event.nativeEvent.eventCount);
  };
  const _onBlur = event => {
    _TextInputState.default.blurInput(inputRef.current);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };
  const _onFocus = event => {
    _TextInputState.default.focusInput(inputRef.current);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };
  const _onPaste = event => {
    if (props.onPaste) {
      const {
        data,
        error
      } = event.nativeEvent;
      props.onPaste(error?.message, data);
    }
  };
  const _onScroll = event => {
    props.onScroll && props.onScroll(event);
  };
  const _onSelectionChange = event => {
    props.onSelectionChange && props.onSelectionChange(event);
    if (inputRef.current == null) {
      // calling `props.onSelectionChange`
      // may clean up the input itself. Exits here.
      return;
    }
    setLastNativeSelection({
      selection: event.nativeEvent.selection,
      mostRecentEventCount
    });
  };
  const multiline = props.multiline ?? false;
  let submitBehavior;
  if (props.submitBehavior != null) {
    // `submitBehavior` is set explicitly
    if (!multiline && props.submitBehavior === 'newline') {
      // For single line text inputs, `'newline'` is not a valid option
      submitBehavior = 'blurAndSubmit';
    } else {
      submitBehavior = props.submitBehavior;
    }
  } else if (multiline) {
    if (props.blurOnSubmit === true) {
      submitBehavior = 'blurAndSubmit';
    } else {
      submitBehavior = 'newline';
    }
  } else {
    // Single line
    if (props.blurOnSubmit !== false) {
      submitBehavior = 'blurAndSubmit';
    } else {
      submitBehavior = 'submit';
    }
  }
  const accessible = props.accessible !== false;
  const focusable = props.focusable !== false;
  const {
    editable,
    hitSlop,
    onPress,
    onPressIn,
    onPressOut,
    rejectResponderTermination
  } = props;
  const config = React.useMemo(() => ({
    hitSlop,
    onPress: event => {
      onPress?.(event);
      if (editable !== false) {
        if (inputRef.current != null) {
          inputRef.current.focus();
        }
      }
    },
    onPressIn: onPressIn,
    onPressOut: onPressOut,
    cancelable: _reactNative.Platform.OS === 'ios' ? !rejectResponderTermination : null
  }), [editable, hitSlop, onPress, onPressIn, onPressOut, rejectResponderTermination]);

  // Hide caret during test runs due to a flashing caret
  // makes screenshot tests flakey
  let caretHidden = props.caretHidden;
  if (_reactNative.Platform.isTesting) {
    caretHidden = true;
  }

  // TextInput handles onBlur and onFocus events
  // so omitting onBlur and onFocus pressability handlers here.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    onBlur,
    onFocus,
    ...eventHandlers
  } = (0, _usePressability.default)(config) || {};
  let _accessibilityState;
  if (accessibilityState != null || ariaBusy != null || ariaChecked != null || ariaDisabled != null || ariaExpanded != null || ariaSelected != null) {
    _accessibilityState = {
      busy: ariaBusy ?? accessibilityState?.busy,
      checked: ariaChecked ?? accessibilityState?.checked,
      disabled: ariaDisabled ?? accessibilityState?.disabled,
      expanded: ariaExpanded ?? accessibilityState?.expanded,
      selected: ariaSelected ?? accessibilityState?.selected
    };
  }
  const style = (0, _flattenStyle.default)(props.style);
  const useMultilineDefaultStyle = props.multiline === true && (style == null || style.padding == null && style.paddingVertical == null && style.paddingTop == null);
  const textInput = /*#__PURE__*/(0, _jsxRuntime.jsx)(_PasteTextInputNativeComponent.default, {
    ref: ref,
    ...otherProps,
    ...eventHandlers,
    accessibilityState: _accessibilityState,
    accessible: accessible,
    submitBehavior: submitBehavior,
    caretHidden: caretHidden,
    dataDetectorTypes: props.dataDetectorTypes,
    focusable: tabIndex !== undefined ? !tabIndex : focusable,
    mostRecentEventCount: mostRecentEventCount,
    nativeID: id ?? props.nativeID,
    onBlur: _onBlur,
    onChange: _onChange,
    onContentSizeChange: props.onContentSizeChange,
    onFocus: _onFocus,
    onPaste: _onPaste,
    onScroll: _onScroll,
    onSelectionChange: _onSelectionChange,
    onSelectionChangeShouldSetResponder: emptyFunctionThatReturnsTrue,
    selection: selection,
    selectionColor: selectionColor,
    style: _reactNative.StyleSheet.compose(useMultilineDefaultStyle ? styles.multilineDefault : null, style),
    text: text,
    children: children
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextAncestor.default.Provider, {
    value: true,
    children: textInput
  });
}
const enterKeyHintToReturnTypeMap = {
  enter: 'default',
  done: 'done',
  go: 'go',
  next: 'next',
  previous: 'previous',
  search: 'search',
  send: 'send'
};
const inputModeToKeyboardTypeMap = {
  none: 'default',
  text: 'default',
  decimal: 'decimal-pad',
  numeric: 'number-pad',
  tel: 'phone-pad',
  search: _reactNative.Platform.OS === 'ios' ? 'web-search' : 'default',
  email: 'email-address',
  url: 'url'
};

// Map HTML autocomplete values to Android autoComplete values
const autoCompleteWebToAutoCompleteAndroidMap = {
  'address-line1': 'postal-address-region',
  'address-line2': 'postal-address-locality',
  'bday': 'birthdate-full',
  'bday-day': 'birthdate-day',
  'bday-month': 'birthdate-month',
  'bday-year': 'birthdate-year',
  'cc-csc': 'cc-csc',
  'cc-exp': 'cc-exp',
  'cc-exp-month': 'cc-exp-month',
  'cc-exp-year': 'cc-exp-year',
  'cc-number': 'cc-number',
  'country': 'postal-address-country',
  'current-password': 'password',
  'email': 'email',
  'honorific-prefix': 'name-prefix',
  'honorific-suffix': 'name-suffix',
  'name': 'name',
  'additional-name': 'name-middle',
  'family-name': 'name-family',
  'given-name': 'name-given',
  'new-password': 'password-new',
  'off': 'off',
  'one-time-code': 'sms-otp',
  'postal-code': 'postal-code',
  'sex': 'gender',
  'street-address': 'street-address',
  'tel': 'tel',
  'tel-country-code': 'tel-country-code',
  'tel-national': 'tel-national',
  'username': 'username'
};

// Map HTML autocomplete values to iOS textContentType values
const autoCompleteWebToTextContentTypeMap = {
  'address-line1': 'streetAddressLine1',
  'address-line2': 'streetAddressLine2',
  'bday': 'birthdate',
  'bday-day': 'birthdateDay',
  'bday-month': 'birthdateMonth',
  'bday-year': 'birthdateYear',
  'cc-csc': 'creditCardSecurityCode',
  'cc-exp-month': 'creditCardExpirationMonth',
  'cc-exp-year': 'creditCardExpirationYear',
  'cc-exp': 'creditCardExpiration',
  'cc-given-name': 'creditCardGivenName',
  'cc-additional-name': 'creditCardMiddleName',
  'cc-family-name': 'creditCardFamilyName',
  'cc-name': 'creditCardName',
  'cc-number': 'creditCardNumber',
  'cc-type': 'creditCardType',
  'current-password': 'password',
  'country': 'countryName',
  'email': 'emailAddress',
  'name': 'name',
  'additional-name': 'middleName',
  'family-name': 'familyName',
  'given-name': 'givenName',
  'nickname': 'nickname',
  'honorific-prefix': 'namePrefix',
  'honorific-suffix': 'nameSuffix',
  'new-password': 'newPassword',
  'off': 'none',
  'one-time-code': 'oneTimeCode',
  'organization': 'organizationName',
  'organization-title': 'jobTitle',
  'postal-code': 'postalCode',
  'street-address': 'fullStreetAddress',
  'tel': 'telephoneNumber',
  'url': 'URL',
  'username': 'username'
};
const verticalAlignToTextAlignVerticalMap = {
  auto: 'auto',
  top: 'top',
  bottom: 'bottom',
  middle: 'center'
};
const ExportedForwardRef = /*#__PURE__*/React.forwardRef(function PasteTextInput({
  allowFontScaling = true,
  rejectResponderTermination = true,
  underlineColorAndroid = 'transparent',
  autoComplete,
  textContentType,
  readOnly,
  editable,
  enterKeyHint,
  returnKeyType,
  inputMode,
  showSoftInputOnFocus,
  keyboardType,
  ...restProps
}, forwardedRef) {
  let style = (0, _flattenStyle.default)(restProps.style);
  if (style?.verticalAlign != null) {
    style.textAlignVertical = verticalAlignToTextAlignVerticalMap[style.verticalAlign];
    delete style.verticalAlign;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(InternalTextInput, {
    allowFontScaling: allowFontScaling,
    rejectResponderTermination: rejectResponderTermination,
    underlineColorAndroid: underlineColorAndroid,
    editable: readOnly !== undefined ? !readOnly : editable,
    returnKeyType: enterKeyHint ? enterKeyHintToReturnTypeMap[enterKeyHint] : returnKeyType,
    keyboardType: inputMode ? inputModeToKeyboardTypeMap[inputMode] : keyboardType,
    showSoftInputOnFocus: inputMode == null ? showSoftInputOnFocus : inputMode !== 'none',
    autoComplete: _reactNative.Platform.OS === 'android' ?
    // @ts-ignore
    autoCompleteWebToAutoCompleteAndroidMap[autoComplete] ?? autoComplete : undefined,
    textContentType: textContentType != null ? textContentType : _reactNative.Platform.OS === 'ios' && autoComplete && autoComplete in autoCompleteWebToTextContentTypeMap ?
    // @ts-ignore
    autoCompleteWebToTextContentTypeMap[autoComplete] : textContentType,
    ...restProps,
    forwardedRef: forwardedRef,
    style: style
  });
});
ExportedForwardRef.displayName = 'PasteTextInput';
const styles = _reactNative.StyleSheet.create({
  multilineDefault: {
    // This default top inset makes RCTMultilineTextInputView seem as close as possible
    // to single-line RCTSinglelineTextInputView defaults, using the system defaults
    // of font size 17 and a height of 31 points.
    paddingTop: 5
  }
});
var _default = exports.default = ExportedForwardRef;
//# sourceMappingURL=PasteTextInput.js.map