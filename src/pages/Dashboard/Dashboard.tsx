import CardFour from '../../components/CardFour.jsx';
import CardOne from '../../components/CardOne.jsx';
import CardThree from '../../components/CardThree.jsx';
import CardTwo from '../../components/CardTwo.jsx';  
import TableThree from '../../components/TableThree.js';
import DefaultLayout from '../../layout/DefaultLayout.js';

const ECommerce = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
        <br />
      <TableThree /> 
    </DefaultLayout>
  );
};

export default ECommerce;
