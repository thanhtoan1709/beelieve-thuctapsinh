import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStyle('');
    setSelectedEvent('');
    setSelectedColor('');
    navigate("/");
  };

  const handleApplyFilters = () => {
    const filters = {
      searchTerm,
      selectedCategory,
      selectedStyle,
      selectedEvent,
      selectedColor
    };

    const queryString = new URLSearchParams(filters).toString();
    navigate(`/filtered?${queryString}`);
  };

  const handleRemoveFilter = (filterType) => {
    switch (filterType) {
      case 'searchTerm':
        setSearchTerm('');
        break;
      case 'selectedCategory':
        setSelectedCategory('');
        break;
      case 'selectedStyle':
        setSelectedStyle('');
        break;
      case 'selectedEvent':
        setSelectedEvent('');
        break;
      case 'selectedColor':
        setSelectedColor('');
        break;
      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Gợi ý..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleApplyFilters}>Apply</button>
      </div>
      <div className="filter-section">
        <h3>- Đi đâu</h3>
        <ul>
          <li
            className={selectedCategory === 'Công việc' ? 'selected' : ''}
            onClick={() => handleCategoryChange('Công việc')}
          >
            Công việc
          </li>
          <li
            className={selectedCategory === 'Thể thao' ? 'selected' : ''}
            onClick={() => handleCategoryChange('Thể thao')}
          >
            Thể thao
          </li>
          <li
            className={selectedCategory === 'Hẹn hò' ? 'selected' : ''}
            onClick={() => handleCategoryChange('Hẹn hò')}
          >
            Hẹn hò
          </li>
          <li
            className={selectedCategory === 'Du lịch' ? 'selected' : ''}
            onClick={() => handleCategoryChange('Du lịch')}
          >
            Du lịch
          </li>
          <li
            className={selectedCategory === 'Sự kiện đặc biệt' ? 'selected' : ''}
            onClick={() => handleCategoryChange('Sự kiện đặc biệt')}
          >
            Sự kiện đặc biệt
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3>- Style</h3>
        <ul>
          <li
            className={selectedStyle === 'Năng động' ? 'selected' : ''}
            onClick={() => handleStyleChange('Năng động')}
          >
            Năng động
          </li>
          <li
            className={selectedStyle === 'Vintage' ? 'selected' : ''}
            onClick={() => handleStyleChange('Vintage')}
          >
            Vintage
          </li>
          <li
            className={selectedStyle === 'Thanh lịch' ? 'selected' : ''}
            onClick={() => handleStyleChange('Thanh lịch')}
          >
            Thanh lịch
          </li>
          <li
            className={selectedStyle === 'Cổ điển' ? 'selected' : ''}
            onClick={() => handleStyleChange('Cổ điển')}
          >
            Cổ điển
          </li>
          <li
            className={selectedStyle === 'Boho' ? 'selected' : ''}
            onClick={() => handleStyleChange('Boho')}
          >
            Boho
          </li>
          <li
            className={selectedStyle === 'Streetwear' ? 'selected' : ''}
            onClick={() => handleStyleChange('Streetwear')}
          >
            Streetwear
          </li>
          <li
            className={selectedStyle === 'Romantic' ? 'selected' : ''}
            onClick={() => handleStyleChange('Romantic')}
          >
            Romantic
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3>- Sự kiện đặc biệt</h3>
        <ul>
          <li
            className={selectedEvent === 'Tết' ? 'selected' : ''}
            onClick={() => handleEventChange('Tết')}
          >
            Tết
          </li>
          <li
            className={selectedEvent === 'Valentine' ? 'selected' : ''}
            onClick={() => handleEventChange('Valentine')}
          >
            Valentine
          </li>
          <li
            className={selectedEvent === 'Halloween' ? 'selected' : ''}
            onClick={() => handleEventChange('Halloween')}
          >
            Halloween
          </li>
          <li
            className={selectedEvent === 'Lễ hội' ? 'selected' : ''}
            onClick={() => handleEventChange('Lễ hội')}
          >
            Lễ hội
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3>- Tone màu</h3>
        <ul className="color-list">
          <li
            onClick={() => handleColorChange('Trắng')}
            className={`color-option white ${selectedColor === 'Trắng' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Đỏ')}
            className={`color-option red ${selectedColor === 'Đỏ' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Tím')}
            className={`color-option purple ${selectedColor === 'Tím' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Vàng')}
            className={`color-option yellow ${selectedColor === 'Vàng' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Đen')}
            className={`color-option black ${selectedColor === 'Đen' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Xám')}
            className={`color-option gray ${selectedColor === 'Xám' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Xanh')}
            className={`color-option blue ${selectedColor === 'Xanh' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Ghi')}
            className={`color-option olive ${selectedColor === 'Ghi' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Tím than')}
            className={`color-option indigo ${selectedColor === 'Tím than' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Nâu')}
            className={`color-option brown ${selectedColor === 'Nâu' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Cam')}
            className={`color-option orange ${selectedColor === 'Cam' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Bê')}
            className={`color-option beige ${selectedColor === 'Bê' ? 'selected' : ''}`}
          ></li>
          <li
            onClick={() => handleColorChange('Cơm')}
            className={`color-option green ${selectedColor === 'Cơm' ? 'selected' : ''}`}
          ></li>
        </ul>
      </div>
      {/* <div className="selected-filters">
        {searchTerm && (
          <button onClick={() => handleRemoveFilter('searchTerm')}>
            {searchTerm} <span>&times;</span>
          </button>
        )}
        {selectedCategory && (
          <button onClick={() => handleRemoveFilter('selectedCategory')}>
            {selectedCategory} <span>&times;</span>
          </button>
        )}
        {selectedStyle && (
          <button onClick={() => handleRemoveFilter('selectedStyle')}>
            {selectedStyle} <span>&times;</span>
          </button>
        )}
        {selectedEvent && (
          <button onClick={() => handleRemoveFilter('selectedEvent')}>
            {selectedEvent} <span>&times;</span>
          </button>
        )}
        {selectedColor && (
          <button onClick={() => handleRemoveFilter('selectedColor')}>
            {selectedColor} <span>&times;</span>
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Sidebar;
