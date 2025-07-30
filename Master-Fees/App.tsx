import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-2g3736nywj";
import { toast } from "sonner";
import { api } from "./utils/supabase/api";
import { useRealTimeNotifications } from "./utils/hooks/useRealTimeNotifications";
import Group1000005059 from "./imports/Group1000005059";
import Frame1707478532 from "./imports/Frame1707478532";
import Frame1707478528 from "./imports/Frame1707478528";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import DetailedOnboardingPage from "./components/DetailedOnboardingPage";
import FinalOnboardingPage from "./components/FinalOnboardingPage";
import PricingStructurePage from "./components/PricingStructurePage";
import ClassSelectionPage from "./components/ClassSelectionPage";
import ProductGroupPage from "./components/ProductGroupPage";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import UserManagement from "./imports/UserManagement";
import Frame1707478669 from "./imports/Frame1707478669";
import Frame1707478670 from "./imports/Frame1707478670";
import Frame1707478602 from "./imports/Frame1707478528-42-1664";
import PaginationContainer from "./imports/PaginationContainer";
import Frame11 from "./imports/Frame11";
import Checkbox from "./imports/Checkbox-42-1932";
import Tasks from "./imports/Tasks-46-578";
import Frame1707478755 from "./imports/Frame1707478755";
import Frame1707478757 from "./imports/Frame1707478757";
import Frame1707478770 from "./imports/Frame1707478770";
import Frame1707478778 from "./imports/Frame1707478778";
import Frame1707478778New from "./imports/Frame1707478778-62-2031";
import Group1000005064 from "./imports/Group1000005064";
import Group1000005058 from "./imports/Group1000005058";
import Group1000005058New from "./imports/Group1000005058-62-1905";
import Group1000005064Wallet from "./imports/Group1000005064-60-1453";
import Group1000005063 from "./imports/Group1000005063";
import ConnectionsContainer from "./imports/ConnectionsContainer";
import Group1000005065 from "./imports/Group1000005065";
import Group1000005066 from "./imports/Group1000005066";
import QuickBooksIntegration from "./components/QuickBooksIntegration";
import Dashboard from "./components/Dashboard";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  category: 'general' | 'support';
}

type AppState = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'onboarding' | 'detailed-onboarding' | 'final-onboarding' | 'class-selection' | 'product-groups' | 'pricing-structure' | 'dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [schoolId, setSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPhone, setResetPhone] = useState('');
  const [resetMethod, setResetMethod] = useState<'email' | 'sms'>('email');
  const [formData, setFormData] = useState({});
  const [detailedFormData, setDetailedFormData] = useState({});
  const [finalFormData, setFinalFormData] = useState({});
  const [classSelectionData, setClassSelectionData] = useState({});
  const [productGroupData, setProductGroupData] = useState({});
  const [completePricingData, setCompletePricingData] = useState({});

  // Session management
  useEffect(() => {
    console.log('🔍 Checking existing session...');
    
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedSchoolId = localStorage.getItem('schoolId');
    const storedSchoolName = localStorage.getItem('schoolName');
    const storedKeepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';
    
    console.log('📊 Session data found:', {
      hasAccessToken: !!storedAccessToken,
      hasSchoolId: !!storedSchoolId,
      hasSchoolName: !!storedSchoolName,
      keepLoggedIn: storedKeepLoggedIn,
      accessTokenLength: storedAccessToken?.length || 0
    });

    if (storedAccessToken && storedSchoolId && storedSchoolName && storedKeepLoggedIn) {
      console.log('✅ Valid session found, auto-logging in');
      
      api.setAccessToken(storedAccessToken);
      setAccessToken(storedAccessToken);
      setSchoolId(storedSchoolId);
      setSchoolName(storedSchoolName);
      setKeepLoggedIn(storedKeepLoggedIn);
      setAppState('dashboard');
      
      toast.success(`Welcome back to ${storedSchoolName}!`);
    } else {
      console.log('ℹ️ No complete session data found or user chose not to stay logged in');
      
      const missing = {
        accessToken: !storedAccessToken,
        schoolId: !storedSchoolId,
        schoolName: !storedSchoolName,
        keepLoggedIn: !storedKeepLoggedIn
      };
      
      console.log('Missing components:', missing);
      setAppState('login');
    }
  }, []);

  const handleLogin = (schoolId: string, schoolName: string, accessToken: string, keepLoggedIn: boolean) => {
    console.log('🔑 handleLogin called with:', {
      schoolId,
      schoolName,
      accessTokenLength: accessToken.length,
      keepLoggedIn
    });

    api.setAccessToken(accessToken);
    setSchoolId(schoolId);
    setSchoolName(schoolName);
    setAccessToken(accessToken);
    setKeepLoggedIn(keepLoggedIn);

    if (keepLoggedIn) {
      console.log('💾 Saving session data to localStorage (keepLoggedIn: true)');
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('schoolId', schoolId);
      localStorage.setItem('schoolName', schoolName);
      localStorage.setItem('keepLoggedIn', 'true');
      
      console.log('✅ Session data saved to localStorage:', {
        accessToken: accessToken.slice(0, 10) + '...',
        schoolId,
        schoolName,
        keepLoggedIn: 'true'
      });
    }

    setAppState('dashboard');
  };

  const handleLogout = () => {
    console.log('🚪 Logout initiated');
    console.log('🚪 API: Signing out and clearing session data');
    
    api.setAccessToken(null);
    setAccessToken('');
    setSchoolId('');
    setSchoolName('');
    setKeepLoggedIn(false);
    
    console.log('🧹 Clearing all stored session data');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('schoolId');
    localStorage.removeItem('schoolName');
    localStorage.removeItem('keepLoggedIn');
    
    setAppState('login');
    toast.success('User signed out successfully');
  };

  const handleSignup = (schoolId: string, schoolName: string, accessToken: string) => {
    handleLogin(schoolId, schoolName, accessToken, false);
  };

  const handleForgotPassword = () => {
    setAppState('forgot-password');
  };

  const handleCodeSent = (email: string, phone: string, method: 'email' | 'sms') => {
    setResetEmail(email);
    setResetPhone(phone);
    setResetMethod(method);
    setAppState('reset-password');
  };

  const handlePasswordReset = (schoolId: string, schoolName: string, accessToken: string) => {
    handleLogin(schoolId, schoolName, accessToken, false);
  };

  const handleOnboardingComplete = (data: any) => {
    setFormData(data);
    setAppState('detailed-onboarding');
  };

  const handleDetailedOnboardingComplete = (data: any) => {
    setDetailedFormData(data);
    setAppState('final-onboarding');
  };

  const handleFinalOnboardingComplete = (data: any) => {
    setFinalFormData(data);
    setAppState('class-selection');
  };

  const handleClassSelectionComplete = (data: any) => {
    setClassSelectionData(data);
    setAppState('product-groups');
  };

  const handleProductGroupComplete = (data: any) => {
    setProductGroupData(data);
    setAppState('pricing-structure');
  };

  const handlePricingStructureComplete = (data: any) => {
    setCompletePricingData({
      ...formData,
      ...detailedFormData,
      ...finalFormData,
      ...classSelectionData,
      ...productGroupData,
      ...data
    });
    setAppState('dashboard');
  };

  const handleBackToLogin = () => {
    setAppState('login');
  };

  const handleBackToOnboarding = () => {
    setAppState('onboarding');
  };

  const handleBackToDetailedOnboarding = () => {
    setAppState('detailed-onboarding');
  };

  const handleBackToFinalOnboarding = () => {
    setAppState('final-onboarding');
  };

  const handleBackToClassSelection = () => {
    setAppState('class-selection');
  };

  if (appState === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSignup={() => setAppState('signup')}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <div className="login-container">
        <div className="login-card">
          <SignupPage 
            onSignup={handleSignup} 
            onBack={handleBackToLogin} 
          />
        </div>
      </div>
    );
  }

  if (appState === 'forgot-password') {
    return (
      <div className="login-container">
        <div className="login-card">
          <ForgotPasswordPage 
            onCodeSent={handleCodeSent} 
            onBack={handleBackToLogin} 
          />
        </div>
      </div>
    );
  }

  if (appState === 'reset-password') {
    return (
      <div className="login-container">
        <div className="login-card">
          <ResetPasswordPage 
            email={resetEmail}
            phone={resetPhone}
            method={resetMethod}
            onPasswordReset={handlePasswordReset}
            onBack={() => setAppState('forgot-password')}
            onResendCode={() => {
              toast.info('Verification code resent successfully');
            }}
          />
        </div>
      </div>
    );
  }

  if (appState === 'onboarding') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <OnboardingPage 
          onComplete={handleOnboardingComplete} 
          onBack={handleBackToLogin}
          initialData={formData}
        />
      </div>
    );
  }

  if (appState === 'detailed-onboarding') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <DetailedOnboardingPage 
          onComplete={handleDetailedOnboardingComplete} 
          onBack={handleBackToOnboarding}
          initialData={detailedFormData}
        />
      </div>
    );
  }

  if (appState === 'final-onboarding') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <FinalOnboardingPage 
          onComplete={handleFinalOnboardingComplete} 
          onBack={handleBackToDetailedOnboarding}
          initialData={finalFormData}
        />
      </div>
    );
  }

  if (appState === 'class-selection') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ClassSelectionPage 
          onComplete={handleClassSelectionComplete} 
          onBack={handleBackToFinalOnboarding}
          initialData={classSelectionData}
        />
      </div>
    );
  }

  if (appState === 'pricing-structure') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <PricingStructurePage 
          onComplete={handlePricingStructureComplete} 
          onBack={handleBackToClassSelection}
          initialData={completePricingData}
        />
      </div>
    );
  }

  if (appState === 'product-groups') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ProductGroupPage 
          onComplete={handleProductGroupComplete} 
          onBack={handleBackToClassSelection}
          completePricingData={classSelectionData}
        />
      </div>
    );
  }

  return (
    <Dashboard 
      schoolName={schoolName}
      onLogout={handleLogout}
    />
  );
}