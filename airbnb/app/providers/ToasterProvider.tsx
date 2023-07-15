'use client'

import { Toaster } from 'react-hot-toast';

const TaosterProvider = () => {
    return(
        <Toaster />
    );
}

export default TaosterProvider;

// As a third party lib, it is not adjusted to next js app directory, thus, best practice is to have a provider having a client parent
// if you just call Toaster into layout, you might get an error about missing useEffect hook for third party libraries.