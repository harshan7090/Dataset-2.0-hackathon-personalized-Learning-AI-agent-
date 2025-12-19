import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationBenefits from './components/RegistrationBenefits';

const UserRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - CodeMaster Pro</title>
        <meta name="description" content="Join CodeMaster Pro and start your personalized coding education journey with adaptive learning and interview preparation" />
      </Helmet>
      <Header />
      <div className="content-container min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Icon name="Sparkles" size={16} />
                  <span>Start Your Journey Today</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Create Your Account
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join thousands of developers improving their skills and preparing for their dream careers
                </p>
              </div>

              <div className="hidden lg:block">
                <RegistrationBenefits />
              </div>

              <div className="hidden lg:block mt-8">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_112cf8eca-1764668943722.png"
                    alt="Group of diverse software developers collaborating on coding project in modern office with laptops and monitors displaying code"
                    className="w-full h-64 object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-sm text-foreground">
                      <Icon name="Users" size={16} />
                      <span className="font-medium">50,000+ developers learning daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pt-16">
              <div className="card-elevated p-6 sm:p-8 rounded-2xl">
                <SocialRegistration />

                <div className="my-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">Or register with email</span>
                    </div>
                  </div>
                </div>

                <RegistrationForm />

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                    <Icon name="Shield" size={14} className="flex-shrink-0 mt-0.5" />
                    <p>
                      Your information is secure and encrypted. We never share your data with third parties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:hidden mt-8">
                <RegistrationBenefits />
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-6 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                  <span>•</span>
                  <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Code2" size={20} color="var(--color-primary)" />
              <span className="text-sm">© {new Date()?.getFullYear()} CodeMaster Pro. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>);

};

export default UserRegistration;