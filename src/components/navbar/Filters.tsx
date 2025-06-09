"use client";

import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Spinner } from "@heroui/spinner";
import { Switch } from "@heroui/switch";

import { useFilters } from "@/hooks/useFilter";

const Filters = () => {
	const {
		totalCount,
		isPending,
		orderByList,
		genderList,
		filters,
		selectAge,
		selectOrder,
		selectGender,
		selectWithPhoto,
	} = useFilters();

	return (
		<div className="shadow-md py-2">
			<div className="flex flex-row justify-around items-center">
				<div className="flex gap-1 items-center text-secondary font-semibold text-xl">
					Results:
					{isPending ? (
						<Spinner size="sm" color="secondary" />
					) : (
						<span>{totalCount}</span>
					)}
				</div>
				<div className="flex gap-2 items-center">
					<div>Gender:</div>
					{genderList.map(({ key, icon: Icon }) => (
						<Button
							key={key}
							size="sm"
							isIconOnly
							color={filters.gender.includes(key) ? "secondary" : "default"}
							onPress={() => selectGender(key)}
						>
							<Icon size={24} />
						</Button>
					))}
				</div>
				<div className="flex flex-row items-center gap-2 w-1/4">
					<Slider
						aria-label="Slider for age selection"
						label="Age range"
						color="secondary"
						size="sm"
						minValue={18}
						maxValue={100}
						defaultValue={filters.ageRange}
						onChangeEnd={(value) => selectAge(value as number[])}
					/>
				</div>
				<div className="flex flex-col text-sm items-center">
					With photo
					<Switch
						defaultSelected
						aria-label="With photo switch"
						size="sm"
						color="secondary"
						onChange={selectWithPhoto}
					/>
				</div>
				<div className="w-1/4">
					<Select
						size="sm"
						fullWidth
						label="Order by"
						variant="bordered"
						color="secondary"
						aria-label="Order by selector"
						selectedKeys={new Set([filters.orderBy])}
						onSelectionChange={selectOrder}
					>
						{orderByList.map((item) => (
							<SelectItem key={item.key}>{item.label}</SelectItem>
						))}
					</Select>
				</div>
			</div>
		</div>
	);
};

export default Filters;
