import {  FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Grid from "../componets/GRID/Grid";


const Category = ({navigation}) => {
  const getdata = (itemdata) => {

   const navigatetodetailpage = ()=>{
    navigation.navigate("Details" , {catid : itemdata.item.id})
   }

    return (
      <Grid title={itemdata.item.title} imageUrl={itemdata.item.imageUrl} onPress={navigatetodetailpage}  />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={getdata}
    />
  );
};

export default Category;
