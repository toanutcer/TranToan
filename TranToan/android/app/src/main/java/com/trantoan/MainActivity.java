package com.trantoan;
import android.os.Bundle; // import this
import com.reactnativenavigation.NavigationActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
     @Override
    protected void onCreate(Bundle savedInstanceState) {
        //SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.splash);

    }
  
}
