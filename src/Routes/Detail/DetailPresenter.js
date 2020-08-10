import React,{useState} from "react";
import PropTypes from "prop-types";
import Ratings from "react-ratings-declarative";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-image: url(${props => props.bgImage});
   background-position: center center;
   background-size: cover;
   filter: blur(3px);
   opacity: 0.5;
   z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  
`;

const Cover = styled.div`
  width:30%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover; 
  border-radius: 5px;
   
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Imdb = styled.a`
  display: inline-block;
  position: relative;
  top: 4px;
  width: 26px;
  height: 16px;
  border-radius: 2px;
  background-image: url(${props => props.src});
  background-position: center center;
  background-size: cover;
`;

const Tabs = styled.div`
  margin-top: 20px;

`;

const Tab = [
    {
        tab: "Production Companies",
        index: 1
    },
    {
        tab: "Production Countries",
        index: 2
    },
    {
        tab: "Seasons",
        index: 3
    }
];
const Panel = styled.div`
   margin: 20px 0;
   
   ${props => {
    if(props.isSelected){
        return "display: block;";
    }else {
        return"display: none;";
    }
}}
  
`;
const PanelItem = styled.p`
  margin-top: 10px;
  margin-left: 2px;
  ${props => {
     if(props.logoPath){
         return "  height: 100px;";
     }   
    }}
  
  background-image: url(${props => props.logoPath});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  position:relative;

`;
const LogoGrid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(1,200px);
  grid-gap:25px;
  width: 100%;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill,125px);
  grid-gap:25px;
`;

const SeasonPoster = styled.p`
  background-image: url(${props => props.logoPath});
  background-position: center center;
  background-size: cover; 
  height: 180px;
  border-radius:5px;
  margin-top:20px;
  position:relative;
`;

const SeasonTitle = styled.span`
    display:inline-block;
    position:absolute;
    top:-30px;
    opacity:0.8;
`;

const CompanyName = styled.span`
display:inline-block;
position:absolute;
top:-10px;
opacity:0.8;
`;
const Button = styled.button`
    border-radius:5px;
    margin-right:10px;
    padding:5px;
  background-color: ${props => props.isSelected ?"gray" :"white"};
  opacity: ${props => props.isSelected ?"1" :"0.5"};
  color: ${props => props.isSelected ?"white" :"black"};
  outline:none;
`;
const useTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab);
    if (!allTabs || !Array.isArray(allTabs)) {
        return;
    }
    console.log("currentIndex",currentIndex);
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex,
        currentIndex: currentIndex
    };
};


const DetailPresenter = ({ result, loading, error }) =>
{

    const { currentItem,changeItem ,currentIndex} = useTabs(0, Tab);
    return(
    loading ?(
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
        <Loader/>
        </>
        ) : (
        <Container>
            <Helmet>
                <title>{result.original_title ? result.original_title : result.original_name}
                | Nomflix</title>
            </Helmet>
            <Backdrop
                bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
            <Content>
                <Cover
                    bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}`: require("../../assets/noPosterSmall.png")}
                />
                <Data>
                    <Title>
                        {result.original_title ? result.original_title : result.original_name}</Title>
                        <ItemContainer>
            {result.release_date
              ? result.release_date.substring(0, 4)
              : result.first_air_date.substring(0, 4)}
            <Divider>•</Divider>
            {result.runtime ? result.runtime : result.episode_run_time} min
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genres, index) =>
                  index === result.genres.length - 1
                    ? genres.name
                    : `${genres.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            {result.imdb_id && (
              <>
                <Item>
                  <Imdb
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target={"_blank"}
                    src={require("../../assets/imdb.png")}
                  />
                </Item>
                <Divider>•</Divider>
              </>
            )}
            {result.vote_average && parseFloat(result.vote_average) / 2 > 0 ? (
              <Item>
                <Ratings rating={parseFloat(result.vote_average) / 2}>
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                </Ratings>
              </Item>
            ) : (
              "No Data"
            )}
          </ItemContainer>
                    <Overview>{result.overview}</Overview>
 
                    <Tabs>
                        {Tab.filter((item,index)=>{
                            if(result.original_name){
                                return item;
                            }else{
                                return index <2;
                            }
                        }).map((section,index) => (
                            <Button isSelected={currentIndex===index} key={index} onClick={() =>changeItem(index)}>{section.tab}</Button>
                        ))}
                      
                        <Panel isSelected={currentIndex===0}>
                            <LogoGrid>
                            {result.production_companies.map(company =>
                                <PanelItem key={company.id}
                                           logoPath={company.logo_path && `https://image.tmdb.org/t/p/original${company.logo_path}`
                                           }
                                > <CompanyName>{company.name}</CompanyName></PanelItem>
                            )}
                            </LogoGrid>
                        </Panel>
                        <Panel isSelected={currentIndex===1}>
                            { result.production_countries && result.production_countries.map((country,index) =>
                                <PanelItem key={index}>{country.iso_3166_1} / {country.name}</PanelItem>
                            )}
                            {!result.production_countries && "Nothing"}
                        </Panel>
                        {result.original_name &&
                            <Panel isSelected={currentIndex===2}>
                                <Grid>
                                {result.seasons.map(season =>
                                
                                    <SeasonPoster key={season.id}
                                               logoPath={season.poster_path && `https://image.tmdb.org/t/p/original${season.poster_path}`}>
                                               <SeasonTitle>{season.name} episodeCount:{season.episode_count}</SeasonTitle>
                                               </SeasonPoster>
                                )}
                                </Grid>
                            </Panel>
                        }

                    </Tabs>

                </Data>
            </Content>
        </Container>
    )
)};


DetailPresenter.propTypes ={
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};



export default DetailPresenter;