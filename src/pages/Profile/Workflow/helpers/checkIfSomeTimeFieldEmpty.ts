  const checkIfSomeTimeFieldEmpty = (
    ...items: string[]
  ) => {
    return [...items].some(
      (field) => !field
    );
  };

  export default checkIfSomeTimeFieldEmpty;
   