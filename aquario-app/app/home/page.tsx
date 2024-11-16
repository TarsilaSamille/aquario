import { LandingPageComponent } from '@/components/landing-page';
import { Navbar } from '@/components/navbar';
import React from 'react';

const HomePage: React.FC = () => {
    return (
              <><Navbar /><LandingPageComponent /></>
    );
};

export default HomePage;