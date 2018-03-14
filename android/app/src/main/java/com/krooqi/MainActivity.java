package com.krooqi;
//https://wix.github.io/react-native-navigation/#/android-specific-use-cases?id=splash-screen
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

import com.reactnativenavigation.controllers.SplashActivity;
import android.content.Intent;

public class MainActivity extends SplashActivity {
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#f7941e"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#FFFFFF"));
        textView.setText("Krooqi");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }
}
