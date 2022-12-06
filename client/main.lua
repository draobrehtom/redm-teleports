local playersCountPerZone = {}
TriggerServerEvent("teleports:playerLeavedZone")

for k,v in ipairs(Config.Locations) do
    local coords = v[1]
    local point = CircleZone:Create(coords, v[4] or Config.DefaultZoneRadius, {
        name="startPoint",
        useZ=true,
        -- debugPoly=debugEnabled
    })
    point:onPlayerInOut(function(isPointInside, point)
        if isPointInside then
            TriggerServerEvent("teleports:playerEnteredZone", k)
        else
            TriggerServerEvent("teleports:playerLeavedZone", k)
        end
    end)
end

function getZonesData()
    local data = {}
    for k,v in ipairs(Config.Locations) do
        -- local coords = v[1]
        local name = v[2]

        local image = v[3]
        if type(image) == "table" then
            if isDaylight() then
                image = image[1]
            else
                image = image[2] or image[1]
            end
        end

        local playersCount = playersCountPerZone[k] or 0
        table.insert(data, {
            name, playersCount, image
        })
    end
    return data
end

RegisterCommand("teleports", function()
    openUI()
    SendNUIMessage({
        updateLocations = getZonesData()
    })
end)

RegisterNetEvent("teleports:updateZoneOnline", function(idx, playersCount)
    playersCountPerZone[idx] = playersCount
    if isNuiShown then
        SendNUIMessage({
            updateLocations = getZonesData()
        })
    end
end)

RegisterNUICallback('teleportTo', function(args, cb)
    local idx = tonumber(args.idx) + 1
    local coords = Config.Locations[idx][1]
    print(coords)
    SetEntityCoordsNoOffset(PlayerPedId(), coords)
    -- exports["spawnmanager"]:spawnPlayer({x=coords.x, y=coords.y, z=coords.z}, function()
    --     cb(true)
    -- end)
end)

RegisterNetEvent("teleports:updateZonesOnline", function(data)
    playersCountPerZone = data
    if isNuiShown then
        SendNUIMessage({
            updateLocations = getZonesData()
        })
    end
end)
