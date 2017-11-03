/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <RNCrashes/RNCrashes.h>
#import <RNAnalytics/RNAnalytics.h>
#import <RNMobileCenter/RNMobileCenter.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTI18nUtil.h>
#import <GoogleMaps/GoogleMaps.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import "RCCManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  [GMSServices provideAPIKey:@"AIzaSyBX6UV7VgQiY7wMFw1eThn8sEgnZXLNjGA"];

  [RNCrashes registerWithCrashDelegate: [[RNCrashesDelegateAlwaysSend alloc] init]];  // Initialize Mobile Center crashes

  [RNAnalytics registerWithInitiallyEnabled:true];  // Initialize Mobile Center analytics

  [RNMobileCenter register];  // Initialize Mobile Center

  
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif
  [[RCTI18nUtil sharedInstance] allowRTL:YES];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:sourceApplication
                                                             annotation:annotation
                  ];
  // Add any custom logic here.
  return handled;
}


@end
