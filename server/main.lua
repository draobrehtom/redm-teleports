local zonesOnline = {}
local playerZone = {}
RegisterNetEvent("teleports:playerEnteredZone", function(idx)
    local playerId = source
    
    playerZone[tostring(playerId)] = idx

    zonesOnline[idx] = zonesOnline[idx] and (zonesOnline[idx] + 1) or 1
    
    TriggerClientEvent("teleports:updateZoneOnline", -1, idx, zonesOnline[idx])
end)

RegisterNetEvent("teleports:playerLeavedZone", function(idx)
    local playerId = source

    if not idx then
        TriggerClientEvent("teleports:updateZonesOnline", playerId, zonesOnline)
        return
    end

    zonesOnline[idx] = zonesOnline[idx] and (zonesOnline[idx] - 1) or 0

    playerZone[tostring(playerId)] = nil

    TriggerClientEvent("teleports:updateZoneOnline", -1, idx, zonesOnline[idx])
end)

AddEventHandler("playerDropped", function(reason)
    local playerId = source

    print(json.encode(playerZone))
    print(json.encode(zonesOnline))

    if playerZone[tostring(playerId)] then

        print("player removed from zone", playerId)

        local idx = playerZone[tostring(playerId)]
        
        zonesOnline[idx] = zonesOnline[idx] and (zonesOnline[idx] - 1) or 0

        TriggerClientEvent("teleports:updateZoneOnline", -1, idx, zonesOnline[idx])

        playerZone[tostring(playerId)] = nil
        
        print(json.encode(playerZone))
        print(json.encode(zonesOnline))
    end
end)