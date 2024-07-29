import {View ,Text} from 'react-native'
import { DESCRIPTION } from '../data/dummy-data';
import Overview from '../componets/details/Overview';

const Details = ({route}) => {
    const id = route.params.catid 
    const description = DESCRIPTION.find(item => item.categorysid == id)
    return (
     <View>
       <Overview title={description.title} imageUrl={description.imageUrl} steps = {description.steps}  />
     </View>
    );
}

export default Details;
