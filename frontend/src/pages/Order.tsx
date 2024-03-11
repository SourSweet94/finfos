import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const Order = () => {

  const {
    state: { user },
  } = useContext(AuthContext);

  const { setLoading } = useContext(AppContext);
  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/order/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      setOrder(json)
      

      setLoading(false);
    };
    if (user) {
      fetchOrder();
    }
  }, []);

  
  return (
    <div>order</div>
  )
}

export default Order