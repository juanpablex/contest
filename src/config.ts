import axios from 'axios';

const Config = {
    baseApiUrl: "https://localhost:7146",
    //baseApiUrl: "http://WebAPI-dev.eba-7tke2ewi.us-east-2.elasticbeanstalk.com",
    //baseApiUrl: "http://WebAPI-dev.eba-ubzx8wbz.us-east-1.elasticbeanstalk.com"
  };
export const api = axios.create({
  baseURL:`${Config}/api/PersonTypes/GetList`,
});

export const fetcher=(url:string)=>api.get(url).then((res)=>res.data);
  const currencyFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const maxHeightPercentage = 75;
  // const containerStyle={
  //   maxHeight: `calc(${maxHeightPercentage}vh - 100px)`,
  //   overflow: 'auto',
  //   msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
  //   scrollbarWidth: 'none', // Hide scrollbar for Firefox
  //   "&::-webkit-scrollbar": {
  //     width: 0, // Hide scrollbar for Chrome, Safari, and Opera
  //   },
  // }
  const mergedStyles: React.CSSProperties = {
    maxHeight: `calc(${maxHeightPercentage}vh - 100px)`,
    overflow: 'auto',
    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
  };

  const webkitScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: 0,
    } as React.CSSProperties,
  };
  
  // Merge the styles together
  const containerStyle: React.CSSProperties = {
    ...mergedStyles,
    ...webkitScrollbarStyle,
  };
  


  const maxHeightPercentagePhone=45;
  const containerStylePhone={
    maxHeight: `calc(${maxHeightPercentagePhone}vh - 100px)`,
    overflow: 'auto',
  }

  const maxHeightDetails = 75;
  // const containerStyleDetails={
    
  //   maxHeight: `calc(${maxHeightDetails}vh - 100px)`,
  //   overflow: 'auto',
  //   msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
  //   scrollbarWidth: 'none', // Hide scrollbar for Firefox
  //   "&::-webkit-scrollbar": {
  //     width: 0, // Hide scrollbar for Chrome, Safari, and Opera
  //   },
  // }
  const mergedStylesDetails: React.CSSProperties = {
    maxHeight: `calc(${maxHeightDetails}vh - 100px)`,
    overflow: 'auto',
    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
  };

  const webkitScrollbarStyleDetails = {
    '&::-webkit-scrollbar': {
      width: 0,
    } as React.CSSProperties,
  };
  
  // Merge the styles together
  const containerStyleDetails: React.CSSProperties = {
    ...mergedStylesDetails,
    ...webkitScrollbarStyleDetails,
  };
  


  const maxHeightList = 200;
  const containerStyleList={
    
    maxHeight: `calc(${maxHeightList}vh - 100px)`,
    overflow: 'auto',
    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    "&::-webkit-scrollbar": {
      width: 0, // Hide scrollbar for Chrome, Safari, and Opera
    },
  }
  
  export default Config;
  export { currencyFormatter ,containerStyle,containerStylePhone, containerStyleDetails,containerStyleList};
  