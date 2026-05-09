interface CategoryButtonProps{
    content?: string
    handleDelete: () => void,
    selected: boolean
    handleClick: () => void
}

export default function CategoryButton(
    {
        content,
        handleDelete,
        selected = false,
        handleClick
    }: CategoryButtonProps
) {
  return (
    <button 
        className={`filter-chip ${ selected && 'selected-filter-chip'}`}
        onClick={handleClick}
    >
        {content}
        <img src="/bin.png" alt="Delete icon" width={25} onClick={handleDelete} />
    </button>
  )
}