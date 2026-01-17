import { Link } from "react-router-dom";
import Seo from "../../components/Seo";



const AdminHome = () => {
    return <>
        <Seo
            title="eMatériel - Panier"
            description="La page Panier"
            url="/panier" 
        />

      
        <h1>AdminHome</h1>

        <Link to={'/admin/products'}>Produits</Link>
       
    </>;

}

export default AdminHome