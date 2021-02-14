import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LiveSearchInput.module.scss';
import iconSearch from '../../icons/icon-search.svg';
import iconSpinner from '../../icons/icon-spinner.svg';

export const LiveSearchInput = ({url, nameSearch, idSearch ,handleItemSelected}) => {

  const [ inputValue, setInputValue ] = useState('');
  const [ dataSearch, setDataSearch ] = useState({
    isLoading: false,
    listItem: [],
  });

  const {
    isLoading,
    listItem,
  } = dataSearch;

  const handleInputChange = ( e ) => {
    setInputValue( e.target.value );
    handleLiveSearch(e.target.value);
  }

  const handleLiveSearch = (word) => {
    if (word.trim().length >= 2) {
      getDataLiveSearch(word)
      .then(response => {
        setDataSearch( value => {
          return { ...value, listItem: response, isLoading: false}
        });
      })
      .catch(err => {
        console.log(err)
        setDataSearch( value => {
          return { ...value, listItem: [], isLoading: false}
        });
      })
    } else{
      setDataSearch( value => {
        return { ...value, listItem: [], isLoading: false}
      });
    }
  }

  const getDataLiveSearch = async( name ) => {
    setDataSearch( value => {
      return { ...value, isLoading: true}
    });
    const allURl = `${url}/?name=${encodeURI(name)}`;
    const resp = await fetch( allURl );
    const { results } = await resp.json();
    const items = results.map( item => {
      return {
        id: item[idSearch],
        name: item[nameSearch],
      }
    });
    return items;
  };

  const selectedItem = (item) => {
    handleItemSelected(item);
    setInputValue(item.name);
    setDataSearch( value => {
      return { ...value, listItem: [], isLoading: false}
    });
  }

  const _words = ( word ) => {
    let regex = new RegExp( '(' + inputValue + ')', 'gi' );
    return word.replace( regex, "<strong>$1</strong>" );
  }

  return(
    <>
      <hr/>
      <h3> Live Search.</h3>
      <div className={styles.live__search}>

        <label className={styles.live__search__label}>Encuentra un personaje</label>
        <div className={styles.live__search__box}>
          <input 
            type="text"
            name="inputValue"
            autoComplete="off"
            value={ inputValue }
            onChange={ handleInputChange }
            className={styles.live__search__input}
            placeholder="Escribe el nombre..." />

          <span className={styles.live__search__icon}> 
            <img className={styles.live__search__icon__input} src={ isLoading ? iconSpinner : iconSearch} alt="icon"/> 
          </span>
          <div className={styles.live__search__listitem}>
            {
              listItem.map((item, i) =>(
                <div 
                  key={i}
                  onClick={() => selectedItem(item)}
                  className={styles.live__search__itemlabel}>
                    <span dangerouslySetInnerHTML={{__html: _words(item.name)}}></span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

LiveSearchInput.propTypes = {
  url: PropTypes.string.isRequired,
  nameSearch: PropTypes.string.isRequired,
  idSearch: PropTypes.string.isRequired
};