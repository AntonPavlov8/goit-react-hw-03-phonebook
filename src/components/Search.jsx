export const Search = prop => {
  function searchFn(e) {
    const searchInput = e.target.value;
    prop.setSearchResults(prev => {
      if (searchInput.length !== 0) {
        return {
          results: [
            ...prop.state.contacts.filter(contact => {
              return contact.name.includes(searchInput);
            }),
          ],
          isSearching: true,
        };
      } else {
        return {
          ...prev,
          isSearching: false,
        };
      }
    });
  }
  return (
    <div>
      <input type="text" name="search" onChange={searchFn} />
    </div>
  );
};
