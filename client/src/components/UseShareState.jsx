import React, { useState } from 'react';
import { useBetween } from 'use-between';

     const UseShareState = () => {

      //Data refresh is always set to Math.random() and updates many useEffect functions
      //Data Refresh is shared between multiple components
      const [dataRefresh, setDataRefresh] = useState("")

      return {
          dataRefresh,
          setDataRefresh,
        }
}

export default UseShareState