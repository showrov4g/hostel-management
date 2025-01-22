import { useQuery } from '@tanstack/react-query';


const UseMeals = () => {
       const {data: meals}= useQuery({
        queryKey: ['meals'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/meals/${user?.email}`)
            return res.data;
        }
    })
    return {meals}
};

export default UseMeals;