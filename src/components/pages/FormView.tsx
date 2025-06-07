import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useRegions } from "../../hooks/generateItems"; // useRegions を使う
import { useEffect, useMemo } from "react";

const AppRole = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  EDITOR: "Editor",
} as const;

type AppRoleType = (typeof AppRole)[keyof typeof AppRole];

// スキーマ定義
const schema = z.object({
  name: z.string(),
  role: z.nativeEnum(AppRole), // ここで型安全にenum定義を利用
  locationId: z.string().optional(),
});

// TypeScript用型
type FormData = z.infer<typeof schema>;

const FormView = () => {
  const { data: regions = [], isLoading } = useRegions();
  // 全ロケーションをフラットに整形
  const allLocations = useMemo(() => {
    return regions.flatMap((region) =>
      region.areas.flatMap((area) => area.locations)
    );
  }, [regions]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: AppRole.ADMIN,
      locationId: "",
    },
  });

  useEffect(() => {
    console.log("useeffect run");
    if (allLocations.length > 0) {
      reset({
        name: "",
        role: AppRole.ADMIN,
        locationId: "",
      });
    }
  }, [reset, allLocations]);

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      locationId: data.locationId === "" ? undefined : data.locationId,
    };
    console.log("送信データ", payload);
    reset();
  };

  if (regions.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ユーザーフォーム
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="名前"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />

        {/* ロール選択追加部分 */}
        <FormControl fullWidth error={!!errors.role} margin="normal">
          <InputLabel id="role-label">ロール</InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                labelId="role-label"
                label="ロール"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("locationId", "");
                }}
              >
                {Object.values(AppRole).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl>

        {/* Location選択 */}
        <FormControl fullWidth error={!!errors.locationId} margin="normal">
          <InputLabel id="location-label">ロケーション</InputLabel>
          <Controller
            name="locationId"
            control={control}
            render={({ field }) => (
              <Select labelId="location-label" label="ロケーション" {...field}>
                {allLocations.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.locationId?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          送信
        </Button>
      </form>
    </Box>
  );
};

export default FormView;
