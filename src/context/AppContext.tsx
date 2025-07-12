import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { AppState, AppAction, DemoContent} from "../types/index";

const initialState: AppState = {
  currentDemo: null,
  completedDemos: [],
  userProgress: {
    totalScore: 0,
    demosCompleted: 0,
    averageScore: 0,
  },
  preferences: {
    animations: true,
    soundEnabled: false,
    difficulty: 'beginner',
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_DEMO':
      return {
        ...state,
        currentDemo: action.payload,
      };
      
    case 'COMPLETE_DEMO': {
      const { demoId, score } = action.payload;
      const isNewCompletion = !state.completedDemos.includes(demoId);
      
      const newCompletedDemos = isNewCompletion 
        ? [...state.completedDemos, demoId]
        : state.completedDemos;
        
      const newTotalScore = state.userProgress.totalScore + score;
      const newDemosCompleted = newCompletedDemos.length;
      const newAverageScore = newDemosCompleted > 0 
        ? Math.round(newTotalScore / newDemosCompleted) 
        : 0;
      
      return {
        ...state,
        completedDemos: newCompletedDemos,
        userProgress: {
          totalScore: newTotalScore,
          demosCompleted: newDemosCompleted,
          averageScore: newAverageScore,
        },
      };
    }
    
    case 'RESET_PROGRESS':
      return {
        ...state,
        completedDemos: [],
        userProgress: {
          totalScore: 0,
          demosCompleted: 0,
          averageScore: 0,
        },
      };
      
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
      
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Custom hook for managing demos
export const useDemos = () => {
  const { state, dispatch } = useAppContext();
  
  const setCurrentDemo = (demo: DemoContent) => {
    dispatch({ type: 'SET_CURRENT_DEMO', payload: demo });
  };
  
  const completeDemo = (demoId: string, score: number) => {
    dispatch({ type: 'COMPLETE_DEMO', payload: { demoId, score } });
  };
  
  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
  };
  
  return {
    currentDemo: state.currentDemo,
    completedDemos: state.completedDemos,
    userProgress: state.userProgress,
    setCurrentDemo,
    completeDemo,
    resetProgress,
  };
};