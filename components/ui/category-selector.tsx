  "use client";

  import { ChevronsUpDown, Check } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandInput,
  } from "@/components/ui/command";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  import { Category } from "@/sanity.types";

  interface CategorySelectorProps {
    categories: Category[];
  }
  
  export function CategorySelectorComponent({
    categories,
  }: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const router = useRouter();
    
    // Add this check to ensure categories is an array
    const categoryItems = Array.isArray(categories) ? categories : [];
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? categoryItems.find((category) => category._id === value)?.title
              : "Select category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search category..."
              className="h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const selectedCategory = categoryItems.find((c) => 
                    c.title
                      ?.toLowerCase()
                      .includes(e.currentTarget.value.toLowerCase())
                  );
                  if (selectedCategory?.slug?.current) {
                    setValue(selectedCategory._id);
                    router.push(`/categories/${selectedCategory.slug.current}`);
                    setOpen(false);
                  }
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categoryItems.map((category) => (
                  <CommandItem
                    key={category._id}
                    value={category.title}
                    onSelect={() => {
                      setValue(value === category._id ? "" : category._id);
                      router.push(`/categories/${category.slug?.current}`);
                      setOpen(false);
                    }}
                  >
                    {category.title}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === category._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
  export default CategorySelectorComponent;


