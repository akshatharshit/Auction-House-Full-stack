

export const AsyncErrors=(newfunction)=>{
   return (req,res,next)=>{
      Promise.resolve(newfunction(req,res,next)).catch(next);
   };
};