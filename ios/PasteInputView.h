//
//  PasteInputView.h
//  PasteInput
//
//  Created by Elias Nahum on 04-11-20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#ifndef RCT_NEW_ARCH_ENABLED

#import <React/RCTMultilineTextInputView.h>

NS_ASSUME_NONNULL_BEGIN

@interface PasteInputView : RCTMultilineTextInputView
    @property (nonatomic, assign) BOOL disableCopyPaste;
    @property (nonatomic, copy, nullable) RCTDirectEventBlock onPaste;
@end

NS_ASSUME_NONNULL_END

#endif
