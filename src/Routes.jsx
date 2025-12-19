import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CodingPractice from './pages/coding-practice';
import Dashboard from './pages/dashboard';
import MockInterview from './pages/mock-interview';
import UserRegistration from './pages/user-registration';
import ProblemLibrary from './pages/problem-library';
import LogicalReasoning from './pages/logical-reasoning';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/coding-practice" element={<CodingPractice />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/problem-library" element={<ProblemLibrary />} />
        <Route path="/logical-reasoning" element={<LogicalReasoning />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
