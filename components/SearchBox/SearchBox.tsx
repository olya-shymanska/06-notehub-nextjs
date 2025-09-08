import css from './SearchBox.module.css'

interface SearchBoxProps {
    value: string,
    onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    }
    return (
        <input type="text" defaultValue={value}
            onChange={handleChange}
            placeholder="Search notes"
            className={css.input}
        />
)
}