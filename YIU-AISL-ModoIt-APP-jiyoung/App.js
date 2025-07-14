import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import SplashScreen from './pages/Splash/SplashScreen';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import SurveyIntroPage from './pages/Survey/SurveyIntroPage';
import SurveyEmotionPage from './pages/Survey/SurveyEmotionPage';
import SurveyImprovementPage from './pages/Survey/SurveyImprovementPage';
import SurveyStrengthPage from './pages/Survey/SurveyStrengthPage';
import PreviewRoutinePage from './pages/PreviewRoutine/PreviewRoutinePage';
import MainPage from './pages/Main/MainPage';
import FeedbackCardPage from './pages/FeedbackCard/FeedbackCardPage';
import FeedbackCardPage2 from './pages/FeedbackCard/FeedbackCardPage2';
import FeedbackCardPage3 from './pages/FeedbackCard/FeedbackCardPage3';
import RoutineDeletePage from './pages/RoutineDelete/RoutineDeletePage';
import SampleRoutinePage from './pages/SampleRoutine/SampleRoutinePage';
import FeedbackCalendarPage from './pages/FeedbackCard/FeedbackCalendarPage';
import ResetPasswordPage from './pages/PasswordReset/ResetPasswordPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SurveyIntro" component={SurveyIntroPage} />
        <Stack.Screen name="SurveyEmotion" component={SurveyEmotionPage} />
        <Stack.Screen
          name="SurveyImprovement"
          component={SurveyImprovementPage}
        />
        <Stack.Screen name="SurveyStrength" component={SurveyStrengthPage} />
        <Stack.Screen name="PreviewRoutine" component={PreviewRoutinePage} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="FeedbackCard" component={FeedbackCardPage} />
        <Stack.Screen name="FeedbackCard2" component={FeedbackCardPage2} />
        <Stack.Screen name="FeedbackCard3" component={FeedbackCardPage3} />
        <Stack.Screen name="RoutineDelete" component={RoutineDeletePage} />
        <Stack.Screen name="SampleRoutine" component={SampleRoutinePage} />
        <Stack.Screen
          name="FeedbackCalendar"
          component={FeedbackCalendarPage}
        />
        <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
