import React,{useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
//nwes api key = 048eb36fa73a49e48b4b60cc85c6e12b
const alanKey='1092ed5b3c8aa59250decbed078a3dca2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => {

    const [newsArticles, setnewsArticles] = useState([]);
    const [activeArticle,setActiveArticle] = useState(-1);
   



    const classes=useStyles();
    useEffect(() =>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if (command === 'newHeadlines') {
                    setnewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command==='highlight')
                {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
                }
                else if(command === 'open')
                {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again...');
                      } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                      } else {
                        alanBtn().playText('Please try that again...');
                      }
                }


        }
    })
    },[])

    return(
        <div>
            <div className={classes.logoContainer}>
            <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
            </div>
      
            <NewsCards articles = {newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;
