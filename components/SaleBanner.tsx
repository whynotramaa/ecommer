import { getActiveSaleByCouponCode } from "@/sanity/lib/salaes/getActiveSaleByCouponCode";

async function SaleBanner() {
const sale = await getActiveSaleByCouponCode("ENDSEM");

    if(!sale?.isActive){
        return null;
    }

    
    return (
    <div className="bg-gradient-to-r from-red-600 to-black text-gray-200 px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-left mb-4">
              {sale.title}
            </h2>
            <p className="text-left text-lg sm:text-xl font-regular mb-6">
              {sale.description}
            </p>
      
            <div className="flex tracking-tighter">
              <div className="bg-gray-200 text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                <span className="font-bold text-gray-800 text-base sm:text-xl">
                  Use code:{" "} 
                  <span className="text-red-600 underline tracking-normal">{sale.couponCode}</span>
                  <span className="ml-2 text-gray-700 font-medium text-base sm:text-xl opacity-50"> for {sale.discountAmount}% OFF </span>
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
)
}

export default SaleBanner;