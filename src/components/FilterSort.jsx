import React from 'react';

const FilterSort = ({ filters, onFilterChange, sortBy, onSortChange }) => {
  return (
    <div className="filter-sort">
      <div className="filters">
        <select 
          value={filters.platform} 
          onChange={(e) => onFilterChange('platform', e.target.value)}
        >
          <option value="">Todas las plataformas</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Mobile">Mobile</option>
        </select>

        <select 
          value={filters.completed} 
          onChange={(e) => onFilterChange('completed', e.target.value)}
        >
          <option value="">Todos</option>
          <option value="completed">Completados</option>
          <option value="not-completed">No completados</option>
        </select>

        <select 
          value={filters.rating} 
          onChange={(e) => onFilterChange('rating', e.target.value)}
        >
          <option value="">Todos los ratings</option>
          <option value="5">5 estrellas</option>
          <option value="4">4+ estrellas</option>
          <option value="3">3+ estrellas</option>
          <option value="2">2+ estrellas</option>
          <option value="1">1+ estrella</option>
        </select>
      </div>

      <div className="sort">
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="title">Ordenar por: Título A-Z</option>
          <option value="title-desc">Ordenar por: Título Z-A</option>
          <option value="hours">Ordenar por: Horas jugadas</option>
          <option value="rating">Ordenar por: Rating</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;